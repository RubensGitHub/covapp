import {Injectable} from '@angular/core';
import {RestServiceImplementation} from '../rest/rest_service_implementation.service';
import {WordPairRequest} from "../model/word_pair.request";
import {WordPairResponse} from "../model/word_pair.response";
import {AnswerRequest} from "../model/answer.request";
import {LanguageResponse} from "../model/language.response";
import {WordListRequest} from "../model/wordlist.request";
import {WordListResponse} from "../model/wordlist.response";
import {CombinationsResponse} from "../model/combinations.response";

@Injectable()
export class WordService extends RestServiceImplementation {

    protected basePath = '/api';

    public getOrCreateWordPair(req: WordPairRequest): Promise<WordPairResponse> {
        const url = this.getBaseUrl() + '/pair/create';
        return this
            .postContextualized<WordPairResponse>(url, req.toBody())
    }

    public getAnswerForWordPair(req: AnswerRequest): Promise<WordPairResponse> {
        const url = this.getBaseUrl() + '/pair/answers/get';
        return this
            .postContextualized<WordPairResponse>(url, req.toBody())
    }

    public getAvailableLanguages(): Promise<LanguageResponse> {
        const url = this.getBaseUrl() + '/pair/languages/get';
        return this
            .getContextualized<LanguageResponse>(url)
    }

    public getAvailableWordsForLanguage(req: WordListRequest): Promise<WordListResponse> {
        const url = this.getBaseUrl() + '/pair/get';
        return this
            .postContextualized<WordListResponse>(url, req.toBody())
    }

    public getCombinationCounts(req: WordListRequest): Promise<CombinationsResponse> {
        const url = this.getBaseUrl() + '/pair/count';
        return this
            .postContextualized<CombinationsResponse>(url, req.toBody())
    }

    public getProofDownload(hash: string): string {
        return this.getBaseUrl() + "/pair/answers/proof/get?hash=" + hash;
    }
}
