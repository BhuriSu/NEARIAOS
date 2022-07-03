import React from 'react';
import './loader2.css';

function Loader2() {
  return (
    <div>
      <div id="plate">
        <div id="bottle">
          <div className="cork" />
          <div className="neck" />
          <div className="body">
            <div className="label" />
            <div className="label-shadow" />
          </div>
        </div>

        <div id="cork" />

        <div id="glass">
          <div className="bowl">
            <div className="wine" />
          </div>
          <div className="stem" />
          <div className="foot" />
        </div>
      </div>
    </div>
  );
}
export default Loader2;
