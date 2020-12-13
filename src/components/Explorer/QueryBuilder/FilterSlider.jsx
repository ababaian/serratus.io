import React, { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet';
import * as d3 from 'd3';
import { createD3RangeSlider } from './d3RangeSlider';

export default (props) => {
    // required props: id, sliderDomain, sliderLimsRef (mutable ref)
    // optional props: linearGradientString, onChange:callback, onTouchEnd:callback

    const slider = useRef(null);
    const sliderLabelL = useRef(null);
    const sliderLabelR = useRef(null);

    const onChange = props.onChange;
    const onTouchEnd = props.onTouchEnd;
    const sliderLimsRef = props.sliderLimsRef;
    // immutables
    const [id] = useState(props.id);
    const [sliderDomain] = useState(props.sliderDomain);
    const [linearGradientString] = useState(props.linearGradientString);

    useEffect(() => {
        const updateLims = (begin, end) => {
            sliderLabelL.current.text(begin);
            sliderLabelR.current.text(end);
            sliderLimsRef.current = [begin, end];
        };

        const drawSlider = () => {
            var sliderDiv = d3.select(`#${id}`);
            slider.current = createD3RangeSlider(d3, sliderDomain[0], sliderDomain[1], sliderDiv);
            slider.current.onChange((range) => updateLims(range.begin, range.end));
            if (linearGradientString) {
                var colorGradient = `background-image: ${linearGradientString};`;
                var newSliderDivStyle = sliderDiv.attr("style") + colorGradient;
                sliderDiv.attr("style", newSliderDivStyle)
                sliderDiv.select(".slider-container")
                    .attr("style", colorGradient);
                sliderDiv.select(".slider")
                    .attr("style", "background: rgba(0,0,0, 0.2)");
            }

            sliderLabelL.current = sliderDiv.select(".WW").append("span")
                .attr("style", "float: left; transform: translate(0px,20px)");
            sliderLabelR.current = sliderDiv.select(".EE").append("text")
                .attr("style", "float: left; transform: translate(-5px,20px)");
        };

        drawSlider();
    }, [id, sliderDomain, linearGradientString, sliderLimsRef]);

    useEffect(() => {
        slider.current && slider.current.range(...sliderLimsRef.current);
        onChange && slider.current.onChange(() => onChange());
        onTouchEnd && slider.current.onTouchEnd(onTouchEnd);
    }, [sliderLimsRef, onChange, onTouchEnd]);

    return (
        <div>
            <Helmet>
                <link href="https://cdn.rawgit.com/RasmusFonseca/d3RangeSlider/master/d3RangeSlider.css" rel="stylesheet"></link>
            </Helmet>
            <div id={props.id} className="relative" style={{ height: 30 }} />
        </div>
    )
}
