import React from 'react';
import './LoadingDots.css';

const LoadingDots = () => {
  return (
    <div className="loading-wrapper">
      <div className="dots-container">
        <div className="dot1">
          <div className="dot-ridge1">
            <div className="dot-ridge2">
              <div className="toplbs">45</div>
              <div className="bottomlbs">45</div>
              <div className="dot-ridge3">
                <div className="dot-ridge4"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="dot2">
          <div className="dot-ridge1">
            <div className="dot-ridge2">
              <div className="toplbs">45</div>
              <div className="bottomlbs">45</div>
              <div className="dot-ridge3">
                <div className="dot-ridge4"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="dot3">
          <div className="dot-ridge1">
            <div className="dot-ridge2">
              <div className="toplbs">45</div>
              <div className="bottomlbs">45</div>
              <div className="dot-ridge3">
                <div className="dot-ridge4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDots;
