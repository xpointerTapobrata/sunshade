import React, { useState } from 'react';
import './Pointsofinterest.css';

const Pointsofinterest = ({ expand, poi }) => {

    return (
        <div className = 'poiclass'>
            <h2 className='title' onClick={expand} style = {{color : 'rgb(40, 40, 40)'}}>POINTS OF INTEREST</h2>
            <div className="list">
                {
                    poi.results ? 
                    poi.results.map((i, index) => (
                        index < 5 &&
                        <div className="card">
                            <h4>{i.poi.name}</h4>
                            <p className = 'street'>{i.address.freeformAddress}</p>
                            <p style = {{fontSize : '0.9rem'}}>{i.poi.url}</p>
                        </div>
                    ))
                    : <h4 style = {{color : 'black'}}>'Nothing to show'</h4>
                }
              
            </div>
        </div>
    )
}

export default Pointsofinterest
