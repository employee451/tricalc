init();

document.querySelector('.btn-calc').addEventListener('click', function() {
  var triangle = {
    angleA: document.getElementById('angle-a').value,
    angleB: document.getElementById('angle-b').value,
    sideA: document.getElementById('side-a').value,
    sideB: document.getElementById('side-b').value,
    sideC: document.getElementById('side-c').value
  }

  calculateTriangle(triangle);
});

document.querySelector('.btn-new').addEventListener('click', function() {
  init();
});

function calculateTriangle(triangle) {
  triangle.angleC = 90;

  if( !triangle.angleA ) {
    if( triangle.angleB ) {
      triangle.angleA = 90 - triangle.angleB;
    } else if( triangle.sideA ) {
      if( triangle.sideB ) {
        triangle.angleA = toDegrees( Math.atan( triangle.sideA / triangle.sideB ) );
      } else if( triangle.sideC ) {
        triangle.angleA = toDegrees( Math.asin( triangle.sideA / triangle.sideC ) );
      }
    } else if( triangle.sideB ) {
      if( triangle.sideC ) {
        triangle.angleA = toDegrees( Math.acos( triangle.sideB / triangle.sideC ) );
      }
    }
  }
  if( !triangle.angleB ) {
    if( triangle.angleA ) {
      triangle.angleB = 90 - triangle.angleA;
    } else if( triangle.sideA ) {
      if( triangle.sideB ) {
        triangle.angleB = toDegrees( Math.atan( triangle.sideB / triangle.sideA ) );
      } else if( triangle.sideC ) {
        triangle.angleB = toDegrees( Math.acos( triangle.sideA / triangle.sideC ) );
      }
    } else if( triangle.sideB ) {
      if( triangle.sideC ) {
        triangle.angleB = toDegrees( Math.asin( triangle.sideB / triangle.sideC ) );
      }
    }
  }
  if( !triangle.sideA ) {
    if( triangle.angleA ) {
      if( triangle.sideB ) {
        triangle.sideA = Math.tan( toRadians( triangle.angleA ) ) * triangle.sideB;
      } else if( triangle.sideC ) {
        triangle.sideA = Math.sin( toRadians( triangle.angleA ) ) * triangle.sideC;
      }
    } else if( triangle.angleB ) {
      if( triangle.sideB ) {
        triangle.sideA = triangle.sideB / Math.tan( toRadians( triangle.angleB ) );
      } else if( triangle.sideC ) {
        triangle.sideA = Math.cos( toRadians( triangle.angleB ) ) * triangle.sideC;
      }
    } else if( triangle.sideB ) {
      if( triangle.sideC ) {
        triangle.sideA = Math.sqrt( Math.pow( triangle.sideC, 2 ) - Math.pow( triangle.sideB, 2 ) );
      }
    }
  }
  if ( !triangle.sideB ) {
    if( triangle.angleA ) {
      if( triangle.sideA ) {
        triangle.sideB = triangle.sideA / Math.tan( toRadians( triangle.angleA ) );
      } else if( triangle.sideC ) {
        triangle.sideB = Math.sin( toRadians( triangle.angleA ) ) * triangle.sideC;
      }
    } else if( triangle.angleB ) {
      if( triangle.sideA ) {
        triangle.sideB = Math.tan( toRadians( triangle.angleB ) ) * triangle.sideA;
      } else if( triangle.sideC ) {
        triangle.sideB = Math.sin( toRadians( triangle.angleB ) ) * triangle.sideC;
      }
    } else if( triangle.sideA ) {
      if( triangle.sideC ) {
        triangle.sideB = Math.sqrt( Math.pow( triangle.sideC, 2) - Math.pow( triangle.sideA, 2) );
      }
    }
  }
  if ( !triangle.sideC ) {
    if( triangle.angleA ) {
      if( triangle.sideA ) {
        triangle.sideC = triangle.sideA / Math.sin( toRadians( triangle.angleA ) );
      } else if( triangle.sideB ) {
        triangle.sideC = triangle.sideB / Math.cos( toRadians( triangle.angleA ) );
      }
    } else if( triangle.angleB ) {
      if( triangle.sideA ) {
        triangle.sideC = triangle.sideA / Math.cos( toRadians( triangle.angleB ) );
      } else if( triangle.sideB ) {
        triangle.sideC = triangle.sideB / Math.sin( toRadians( triangle.angleB ) );
      }
    } else if( triangle.sideA ) {
      if( triangle.sideB ) {
        triangle.sideC = Math.sqrt( Math.pow( triangle.sideA, 2 ) + Math.pow( triangle.sideB, 2 ) );
      }
    }
  }

  if( !triangle.angleA || !triangle.angleB || !triangle.sideA || !triangle.sideB || !triangle.sideC ) {
    alert('Not enough information was supplied. You need at least an angle and a side or two sides.');
  } else {
    document.getElementById('angle-a').value = triangle.angleA;
    document.getElementById('angle-b').value = triangle.angleB;
    document.getElementById('side-a').value = triangle.sideA;
    document.getElementById('side-b').value = triangle.sideB;
    document.getElementById('side-c').value = triangle.sideC;
  }
}

function init() {
  document.getElementById('angle-a').value = '';
  document.getElementById('angle-b').value = '';
  document.getElementById('side-a').value = '';
  document.getElementById('side-b').value = '';
  document.getElementById('side-c').value = '';
}

// Functions
function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}
