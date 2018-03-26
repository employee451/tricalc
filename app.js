const mathController = (() => {

  const toRadians = (angle) => angle * (Math.PI / 180);

  const toDegrees = (angle) => angle * (180 / Math.PI);

  return {
    calculateTriangle: (triangle) => {
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

      return triangle;
    }
  };

})();

const UIController = (() => {

  const DOMElements = {
    angles: {
      a: document.getElementById('angle-a'),
      b: document.getElementById('angle-b')
    },

    sides: {
      a: document.getElementById('side-a'),
      b: document.getElementById('side-b'),
      c: document.getElementById('side-c')
    },

    buttons: {
      calc: document.querySelector('.btn-calc'),
      new: document.querySelector('.btn-new')
    }
  }

  return {
    resetValues: () => {
      DOMElements.angles.a.value = '';
      DOMElements.angles.b.value = '';

      DOMElements.sides.a.value = '';
      DOMElements.sides.b.value = '';
      DOMElements.sides.c.value = '';
    },

    readValues: () => {
      return {
        angleA: DOMElements.angles.a.value,
        angleB: DOMElements.angles.b.value,
        sideA: DOMElements.sides.a.value,
        sideB: DOMElements.sides.b.value,
        sideC: DOMElements.sides.c.value
      }
    },

    setValues: (triangle) => {
      DOMElements.angles.a.value = triangle.angleA;
      DOMElements.angles.b.value = triangle.angleB;
      DOMElements.sides.a.value = triangle.sideA;
      DOMElements.sides.b.value = triangle.sideB;
      DOMElements.sides.c.value = triangle.sideC;
    },

    getDOMElements: () => DOMElements
  };

})();

const appController = ((mathCtrl, UICtrl) => {

  const calculateTriangle = () => {
    let triangle = UICtrl.readValues();

    triangle = mathCtrl.calculateTriangle(triangle);

    if( !triangle.angleA || !triangle.angleB || !triangle.sideA || !triangle.sideB || !triangle.sideC ) {
      alert('Not enough information was supplied. You need at least an angle and a side or two sides.');
    } else {
      UICtrl.setValues(triangle);
    }
  };

  const setupEventListeners = () => {
    const DOMElements = UICtrl.getDOMElements();

    DOMElements.buttons.calc.addEventListener('click', calculateTriangle);

    DOMElements.buttons.new.addEventListener('click', appController.init);
  };

  return {
    init: () => {
      UICtrl.resetValues();
      setupEventListeners();
    }
  };

})(mathController, UIController);

appController.init();
