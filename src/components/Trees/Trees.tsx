import React from 'react'
import { Helmet } from 'react-helmet'
import { Dropdown } from './Dropdown'
import { Selector } from './Selector'
import { defaultFamily, defaultOrder, getLevelValues } from './config'
import { LinkButton, downloadIcon, externalLinkIcon, ExternalLink, helpIcon } from 'common'

export const Trees = () => {
    const [loading, setLoading] = React.useState(true)
    const [searchLevel, setSearchLevel] = React.useState('order')
    const [selected, setSelected] = React.useState({
        order: defaultOrder,
        family: defaultFamily,
    } as {
        [key: string]: any
    })

    React.useEffect(() => {
        setLoading(true)
    }, [searchLevel, selected])

    const headTags = (
        <Helmet>
            <title>Serratus | Trees</title>
        </Helmet>
    )

    const msaSvgLink = `https://s3.amazonaws.com/serratus.io/trees/svg/${selected[searchLevel]}.svg`
    const msaNewickLink = `https://s3.amazonaws.com/serratus.io/trees/tree/${selected[searchLevel]}.newick`
    const msaFastaLink = `https://s3.amazonaws.com/serratus.io/trees/msa/${selected[searchLevel]}.fasta`
    const reactMsaViewParams = {
        msaview: {
            data: {},
            id: 'YbZqQjM4G',
            type: 'MsaView',
            height: 550,
            treeAreaWidth: 400,
            treeWidth: 300,
            rowHeight: 20,
            scrollY: 0,
            scrollX: 0,
            blockSize: 1000,
            selectedStructures: [],
            labelsAlignRight: false,
            colWidth: 16,
            showBranchLen: true,
            bgColor: true,
            drawTree: true,
            drawNodeBubbles: true,
            colorSchemeName: 'maeditor',
            treeFilehandle: {
                uri: msaNewickLink,
            },
            msaFilehandle: { uri: msaFastaLink },
            currentAlignment: 0,
            collapsed: [],
        },
        nglSelection: '',
    }
    const reactMsaViewLink = `https://gmod.github.io/react-msaview/?data=${encodeURIComponent(
        JSON.stringify(reactMsaViewParams)
    )}#`

    return (
        <>
            <div className='mx-4 my-2'>
                {headTags}
                <div className='text-center text-xl mb-2'>Trees and Alignments</div>
                <Selector searchLevel={searchLevel} setSearchLevel={setSearchLevel} />
                <div className='flex justify-center my-2'>
                    <div className='w-64'>
                        <Dropdown
                            values={getLevelValues(searchLevel)}
                            selected={selected[searchLevel]}
                            setSelected={(newValue) => {
                                setSelected((oldValues) => ({
                                    ...oldValues,
                                    [searchLevel]: newValue,
                                }))
                            }}
                        />
                    </div>
                </div>
                <div className='flex justify-center my-2'>
                    <LinkButton
                        link={msaNewickLink}
                        text='Newick'
                        icon={downloadIcon}
                        download={true}
                    />
                    <LinkButton
                        link={msaFastaLink}
                        text='MSA'
                        icon={downloadIcon}
                        download={true}
                    />
                    <LinkButton
                        link={reactMsaViewLink}
                        text='MSA Viewer'
                        icon={externalLinkIcon}
                        newTab={true}
                    />
                    <ExternalLink href='https://github.com/ababaian/serratus/wiki/Trees-and-alignments-for-Ribovirus-orders-and-families'>
                        {helpIcon}
                    </ExternalLink>
                </div>
                <div className='flex flex-col justify-center my-2'>
                    <span className={loading ? 'text-center' : 'hidden'}>Loading...</span>
                    <div
                        className={
                            loading
                                ? 'invisible'
                                : 'flex flex-row justify-center items-center w-full'
                        }>
                        <img
                            className='w-3/4 lg:w-1/3'
                            src={msaSvgLink}
                            onLoad={() => setLoading(false)}
                        />
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <span
                                    className='w-5 h-5 mr-2'
                                    style={{ backgroundColor: '#017500' }}
                                />
                                GenBank / Known RdRP
                            </div>
                            <div className='flex flex-row'>
                                <span
                                    className='w-5 h-5 mr-2'
                                    style={{ backgroundColor: '#ff03ff' }}
                                />
                                Serratus RdRP
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
