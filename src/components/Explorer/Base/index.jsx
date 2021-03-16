import React from 'react';
import { Helmet } from 'react-helmet';
import QueryBuilder from './QueryBuilder';
import Intro from './Intro';
import Result from './Result';
import DataReference from './DataReference';
import { classesBoxBorder } from '../../../common/Helpers';
import {
    identityDomain,
    coverageDomain,
    parseRange,
    searchLevels,
    resultSectionId
} from "./ExplorerHelpers";

const switchSize = "lg";  // Tailwind prefix to switch between landscape/portrait mode

const ExplorerBase = ({
        searchType,
        defaultSearchLevelValues,
        location}) => {
    const searchLevelStaticRef = React.useRef();
    const searchLevelValueStaticRef = React.useRef();
    const identityLimsStaticRef = React.useRef();
    const coverageLimsStaticRef = React.useRef();

    var searchLevelFromParam = null;
    var searchLevelValueFromParam = null;
    var identityLimsFromParam = null;
    var coverageLimsFromParam = null;
    var urlParams = new URLSearchParams(location.search);
    searchLevels.forEach(searchLevel => {
        var searchLevelValue = urlParams.get(searchLevel);
        // assuming mutually exclusive parameters
        if (searchLevelValue) {
            searchLevelFromParam = searchLevel;
            searchLevelValueFromParam = searchLevelValue;
        }
    });
    var searchLevelProvided = searchLevelFromParam !== null;
    var identityParamStr = urlParams.get("identity");
    if (identityParamStr) identityLimsFromParam = parseRange(identityParamStr, identityDomain);
    var coverageParamStr = urlParams.get("coverage");
    if (coverageParamStr) coverageLimsFromParam = parseRange(coverageParamStr, coverageDomain);

    const willMount = React.useRef(true);
    if (willMount.current) {
        // set defaults
        if (!identityLimsFromParam) { identityLimsFromParam = identityDomain }
        if (!coverageLimsFromParam) { coverageLimsFromParam = [50, 100] }
        // family must be valid for initial chart render
        if (!searchLevelFromParam) { searchLevelFromParam = "family" }
        if (!searchLevelValueFromParam) { searchLevelValueFromParam = "Coronaviridae" }

        searchLevelStaticRef.current = (searchLevelFromParam);
        searchLevelValueStaticRef.current = (searchLevelValueFromParam);
        identityLimsStaticRef.current = (identityLimsFromParam);
        coverageLimsStaticRef.current = (coverageLimsFromParam);

        willMount.current = false;
    }

    // values that change with user input (QueryBuilder)
    const [searchLevel, setSearchLevel] = React.useState(searchLevelStaticRef.current);
    const [searchLevelValue, setSearchLevelValue] = React.useState(searchLevelValueStaticRef.current);
    const identityLimsRef = React.useRef(identityLimsStaticRef.current);
    const coverageLimsRef = React.useRef(coverageLimsStaticRef.current);

    return (
        <div className={`flex flex-col ${switchSize}:flex-row p-4 min-h-screen sm:bg-gray-200`}>
            <Helmet>
                <title>Serratus | {searchLevelValueStaticRef.current ? `${searchLevelValueStaticRef.current}` : "Explorer"}</title>
            </Helmet>
            <div className={`flex flex-col px-4 py-2 w-full ${switchSize}:w-1/3 ${classesBoxBorder}`}>
                <QueryBuilder
                    searchType={searchType}
                    identityLimsRef={identityLimsRef}
                    coverageLimsRef={coverageLimsRef}
                    defaultSearchLevelValues={defaultSearchLevelValues}
                    searchLevel={searchLevel}
                    setSearchLevel={setSearchLevel}
                    searchLevelValue={searchLevelValue}
                    setSearchLevelValue={setSearchLevelValue} />
                <div className={`hidden ${switchSize}:block mb-auto text-center`}>
                    <DataReference />
                </div>
            </div>
            <div className={`h-0 sm:h-3 ${switchSize}:w-3`} />
            <hr className="sm:hidden" />
            <div id={resultSectionId} className={`p-4 w-full ${switchSize}:w-2/3 ${classesBoxBorder}`}>
                {!searchLevelProvided ?
                    <Intro /> :
                    <Result
                        searchLevel={searchLevelStaticRef.current}
                        searchLevelValue={searchLevelValueStaticRef.current}
                        identityLims={identityLimsStaticRef.current}
                        coverageLims={coverageLimsStaticRef.current} />
                }
                <div className={`${switchSize}:hidden`}>
                    <DataReference />
                </div>
            </div>
        </div>
    )
}

export default ExplorerBase;