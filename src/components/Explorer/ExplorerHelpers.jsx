import React from "react";

// definitions
export const queryTypes = ["family", "genbank", "run"];
export const identityDomain = [75, 100];
export const coverageDomain = [0, 100];
export const resultSectionId = "result";

// color palettes
export const viridisCssGradient = "linear-gradient(90deg, #440154, #482475, #414487, #355f8d, #2a788e, #21908d, #22a884, #42be71, #7ad151, #bddf26, #fce640)" // slight modification of https://bennettfeely.com/cssscales/#viridis


// functions

export const getIdentitySliderLabel = (type) => {
    let typeMap = {
        family: "Average alignment identity (%)",
        genbank: "Alignment identity (%)"
    };
    return typeMap[type];
}

export const getCoverageSliderLabel = (type) => {
    let typeMap = {
        family: "Score (pangenome coverage)",
        genbank: "Coverage"
    };
    return typeMap[type];
}

export const InputOption = (props) => {
    return (
        <div className={props.className}>
            <input type="radio" name="querytype" value={props.value} checked={props.checked}
                onChange={props.onChange} />
            <span className="ml-1">{props.displayText}</span>
        </div>
    )
}

// filtering

export const parseRange = (rangeStr, bounds) => {
    // parse
    rangeStr = rangeStr.slice(1, rangeStr.length - 1);
    var [low, high] = rangeStr.split("-").map((s) => {
        var intVal = +s;
        if (isNaN(intVal)) {
            throw new Error("Invalid query parameter value");
        }
        return intVal;
    });

    // constrict
    var [min, max] = bounds;
    if (low < min) low = min;
    if (high > max) high = max;
    if (low > max) low = max;
    if (high < min) high = min;

    return [low, high];
}

export const constructRangeStr = (begin, end) => {
    return `[${begin}-${end}]`;
}
