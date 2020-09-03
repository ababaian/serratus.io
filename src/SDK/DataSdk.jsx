import axios from 'axios'
import { constructRangeStr } from '../helpers/QueryPageHelpers';

export default class DataSdk {

    baseUrl = process.env.REACT_APP_API_URL;
    eutilsUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

    async fetchSraRun(sraAccession) {
        const response = await axios.get(`${this.baseUrl}/api/run/get-run/${sraAccession}`);
        return response.data
    }

    async fetchSraMatchesByAccession(genbankAccession, pageNumber, itemsPerPage, identityRange, coverageRange) {
        var identity = constructRangeStr(...identityRange);
        var coverage = constructRangeStr(...coverageRange);
        const response = await axios.get(`${this.baseUrl}/api/genbank/get-runs/${genbankAccession}?page=${pageNumber}&itemsPerPage=${itemsPerPage}&pctId=${identity}&cvgPct=${coverage}`);
        return response.data;
    }

    async fetchSraMatchesByFamily(familyName, pageNumber, itemsPerPage, identityRange, coverageRange) {
        var identity = constructRangeStr(...identityRange);
        var coverage = constructRangeStr(...coverageRange);
        const response = await axios.get(`${this.baseUrl}/api/family/get-runs/${familyName}?page=${pageNumber}&itemsPerPage=${itemsPerPage}&pctId=${identity}&score=${coverage}`);
        return response.data;
    }

    async getEsearch(db, term) {
        const response = await axios.get(`${this.eutilsUrl}/esearch.fcgi?db=${db}&term=${term}&retmax=1&usehistory=y`, { responseType: 'text' });
        return response.data;
    }

    async getEsummary(db, entrezId) {
        const response = await axios.get(`${this.eutilsUrl}/esummary.fcgi?db=${db}&id=${entrezId}`, { responseType: 'text' });
        return response.data;
    }

    async tryGetSraStudyName(accession) {
        try {
            // eSearch
            let db = "sra";
            let response = await this.getEsearch(db, accession);
            let parser = new DOMParser();
            let esearchResults = parser.parseFromString(response, 'text/xml');
            let entrezId = esearchResults
                .querySelector("eSearchResult")
                .querySelector("IdList")
                .querySelector("Id")
                .textContent;
            // eSummary
            response = await this.getEsummary(db, entrezId);
            let esummaryResults = parser.parseFromString(response, 'text/xml');
            let expXmlText = esummaryResults
                .querySelector("eSummaryResult")
                .querySelector("DocSum")
                .querySelector("Item") // first Item
                .textContent;
            // eSummary expXml
            expXmlText = '<tag>' + expXmlText + '</tag>';
            let expXml = parser.parseFromString(expXmlText, 'text/xml');
            let entrezStudyName = expXml
                .getRootNode()
                .querySelector('Study')
                .getAttribute('name')
            return entrezStudyName;
        }
        catch (err) {
            return;
        }
    }

    async tryGetGenBankTitle(accession) {
        try {
            // eSearch
            let db = "nuccore"
            let response = await this.getEsearch(db, accession);
            let parser = new DOMParser();
            let esearchResults = parser.parseFromString(response, 'text/xml');
            let entrezId = esearchResults
                .querySelector("eSearchResult")
                .querySelector("IdList")
                .querySelector("Id")
                .textContent;
            // eSummary
            response = await this.getEsummary(db, entrezId);
            let esummaryResults = parser.parseFromString(response, 'text/xml');
            let title = esummaryResults
                .querySelector("eSummaryResult")
                .querySelector("DocSum")
                .querySelector("Item[Name=Title]")
                .textContent;
            return title;
        }
        catch (err) {
            return;
        }
    }
}
