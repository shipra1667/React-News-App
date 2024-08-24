import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div>
        <div className='spinnerOverlay'>
            <div className='spinnerPosition'>
                <div className="spinner text-center"></div>
            </div>
        </div>
      </div>
    )
  }
}

export default Spinner
