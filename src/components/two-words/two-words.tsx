import { WordService } from "../../cov2words_client_js/rest_services/word.service";
import { WordPairResponse } from "../../cov2words_client_js/model/word_pair.response";
import { WordPairRequest } from "../../cov2words_client_js/model/word_pair.request";
import { ServiceError } from "../../cov2words_client_js/error_handling/service_error.type";

import { Component, h, Listen, Prop, State } from '@stencil/core';
import { QUESTIONNAIRE_VERSION } from '../../global/constants';
import {
  CheckboxOption,
  MULTIPLE_CHOICE,
  QUESTIONS,
  XML_ORDER,
} from '../../global/questions';
import i18next from '../../global/utils/i18n';
import { getQuestionIndexById } from '../views/questionnaire/utils';

export type KeyValue = { key: string; value: string };

@Component({
  styleUrl: 'two-words.css',
  tag: 'ia-two-words',
})
export class TwoWords {
  @Prop() answers: any = {};
  @Prop() word_service: WordService;
  @State() language: string;
  @State() twowords: Array<string>;

  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  generateXML = (answers): string => {
    let xml = `<PATIENT><V0>${QUESTIONNAIRE_VERSION}</V0>`;
    let xmlPairs = this.generateXMLValues(answers);
    xmlPairs.sort(this.XMLSort);
    for (const pair of xmlPairs) {
      xml += `<${pair.key}>${pair.value}</${pair.key}>`;
    }
    xml += '</PATIENT>';
    return xml;
  };

  generateXMLValues = (answers): KeyValue[] => {
    let pairs = [];
    for (const key in answers) {
      if (key.startsWith(MULTIPLE_CHOICE)) {
        const question = QUESTIONS[getQuestionIndexById(key)];
        for (const index in question.options) {
          const option = (question.options as CheckboxOption[])[index];
          const xmlValue = answers[key].indexOf(index) > -1 ? '1' : '2';
          pairs.push({ key: option.id, value: xmlValue });
        }
      } else {
        if (answers[key].indexOf('.') > -1) {
          pairs.push({ key, value: answers[key].replace(/\./g, '') });
        } else {
          pairs.push({ key, value: parseInt(answers[key], 10) + 1 });
        }
      }
    }
    return pairs;
  };

  XMLSort = (a: KeyValue, b: KeyValue): number => {
    let a_prefix = XML_ORDER.indexOf(a.key[0]);
    let b_prefix = XML_ORDER.indexOf(b.key[0]);
    if (a_prefix !== b_prefix) {
      return a_prefix - b_prefix;
    }

    let a_suffix = a.key[1];
    let b_suffix = b.key[1];
    if (a_suffix !== b_suffix) {
      return a_suffix < b_suffix ? -1 : 1;
    }

    return 0;
  };


  requestTwoWords = (): string[] => {
    console.log("inside requestTwoWords()");
    console.log(this.language)
    console.log(this.generateXML(this.answers))
    this.word_service.getOrCreateWordPair(
      new WordPairRequest(
        this.language,
        this.generateXML(this.answers)
      )

    )
      .then((res: WordPairResponse) => this._handleResponse(res))
      .catch(err => this._showError(err));
    console.log(this.twowords)
    return this.twowords;

  }

  private _handleResponse(res: WordPairResponse) {
    let i = 0;
    for (i; i < res.words.length; i++) {
      this.twowords[i] = res.words[i].word
    }
  }

  private _showError(err: ServiceError) {
    console.log(err.errorMessage)
  }



  render() {
    console.log("Attempting to render two-words")
    const { requestTwoWords } = this;

    return (
      <div class="two-words">
        <h3>{i18next.t('two_words_headline')}</h3>
        <p>{i18next.t('two_words_paragraph')}</p>
        <div>
          {requestTwoWords()}
        </div>
      </div>
    );
  }
}
