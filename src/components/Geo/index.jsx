import React from 'react'
import { Helmet } from 'react-helmet';
import MapPlot from './MapPlot';
import SelectionInfo from './SelectionInfo';
import {
    helpIcon
} from '../../common/Helpers';

const Geo = () => {
    const [selectedPoints, setSelectedPoints] = React.useState();
    const [isCollapsed, setIsCollapsed] = React.useState(false);


    const headTags = (
        <Helmet>
            <title>Serratus | Planetary RNA Virome</title>
        </Helmet>
    )

    return <div className="mx-4 my-2">
        {headTags}
        <div className="text-center text-xl">The Planetary RNA Virome</div>

          <button className="text-left collapse-button" onClick={() => setIsCollapsed(!isCollapsed)} >
            {helpIcon} Info
          </button>
        <div
          className={`collapse-content ${!isCollapsed ? 'collapsed' : 'expanded'}`}
          aria-expanded={isCollapsed}
        >
            <p>We searched 5.7 million public sequencing libraries for the RNA virus hallmark gene, RNA-dependent RNA Polymerase (RdRP).</p>
            
            <p>This map shows the location of BioSamples from which an intact RdRP sequence could be recovered and geographical meta-data was present.</p>
            
            <p> A 100-meter randomization is applied to all points to prevent overplotting.</p>
        </div>

        <div className="my-2">
            <MapPlot setSelectedPoints={setSelectedPoints} />
        </div>

        <div class="text-left text-gray-600">Use the <b>`Box Select`</b> or <b>`Lasso Select`</b> icons in the top-right to retrieve a list of sample details below the map.</div>

        <SelectionInfo selectedPoints={selectedPoints} />
    </div>
}

export default Geo;
