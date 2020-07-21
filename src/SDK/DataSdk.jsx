import axios from 'axios'

export default class DataSdk {
    async getSraByName(sraName) {
        const response = await axios.get(`https://serratustest-dev-sumdb.us-east-1.elasticbeanstalk.com/api/runs/get-run/${sraName}`);
        return response.data
    }

    async fetchAccessionJSON(accession) {
        const response = await axios.get(`https://api.serratus.io/api/summary/${accession}`);
        return response.data;
    }

    async getSraHeatMapByName(sraName) {
        const response = await axios.get(`https://api.serratus.io/api/summary/${sraName}/coverage_heatmap.png`, { responseType: 'blob' });
        return response.data;
    }

    async getEsearch(db, term) {
        const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=${db}&term=${term}&retmax=1&usehistory=y`, { responseType: 'text' });
        return response.data;
    }

    async getEsummary(db, entrezId) {
        const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=${db}&id=${entrezId}`, { responseType: 'text' });
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
}
