import React from 'react';

export default function (props) {
    return(
        <div className="check_mark">
            <div className="sa-icon sa-success animate">
                <span className="sa-line sa-tip animateSuccessTip"></span>
                <span className="sa-line sa-long animateSuccessLong"></span>
                <div className="sa-placeholder"></div>
                <div className="sa-fix"></div>
            </div>
        </div>
    );
}