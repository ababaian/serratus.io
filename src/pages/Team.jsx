import React from 'react'
import { Helmet } from 'react-helmet';
import { classesBoxBorder } from '../helpers/common';

import teamData from '../data/teamData.json';

export default () => {

    const headTags = (
        <Helmet>
            <title>Serratus | Team</title>
        </Helmet>
    )

    return (
        <div className="p-4 lg:px-24 min-h-screen sm:bg-gray-200">
            {headTags}
            <div className={`p-2 ${classesBoxBorder}`}>
                <div className="text-left md:text-center">
                    <div>Serratus is an Open-Science project. Our aim is to create a 100% reproducible study with 100% transparent and freely available data.</div>
                    <a href="https://github.com/ababaian/serratus/blob/master/CONTRIBUTING.md" className="text-blue-600" target="_blank" rel="noopener noreferrer">We welcome all scientists and developers to contribute.</a>
                </div>
            </div>
            <div className="sm:h-3"></div>
            <div className={`sm:px-3 ${classesBoxBorder}`}>
                {teamData.teams.map((team) => {
                    return (
                        <div key={team.name} className="my-3">
                            <h2 className="text-xl mb-1 text-center md:text-left">{team.name}</h2>
                            <div className="flex flex-col md:flex-row md:flex-wrap mx-2 md:ml-6">
                                {team.members.map((member) => {
                                    return (
                                        <div key={member.name} className="w-full md:w-1/2 lg:w-1/4 md:px-2 my-1">
                                            <h3 className="font-bold">{member.name}</h3>
                                            {member.affiliation ?
                                                <div className="text-sm inverse-indent">{member.affiliation}</div> : null}
                                            {member.email ?
                                                <div className="text-sm">{member.email}</div> : null}
                                            {member.github ?
                                                <div><a href={`https://github.com/${member.github}`} className="text-sm text-blue-600" target="_blank" rel="noopener noreferrer">@{member.github}</a></div> : null}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <div className="my-3">
                    <h2 className="text-xl mb-1 text-center md:text-left">Special Thanks to:</h2>
                    <div className="mx-2 md:ml-6">
                        <div>Nicole Pereyaslavsky. University of British Columbia.</div>
                        <div>The many contributors along the way who helped get this project going.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}