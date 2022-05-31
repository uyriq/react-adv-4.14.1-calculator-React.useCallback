import calculatorStyles from './calculator.module.css';
import React from 'react';

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

export function Calculator() {
  const [value, setValue] = React.useState(0);
  const [decimalPending, setDecimalPending] = React.useState(false);
  const { pad, display, btn, btn_equal, container } = calculatorStyles;
  const [currentOperation, setCurrentOperation] = React.useState('');
  const memoizedValue = React.useRef(0);

  const onNumberClick = e => {
    if (decimalPending) {
      finishDecimal();
    }
    setValue(Number(value + e.target.value));
  };

  const onResetClick = () => {
    setValue(0);
    clear();
    if (decimalPending) {
      setDecimalPending(false);
    }
  };

  const onDecimalClick = () => {
    if (!isFloat(value)) {
      setValue(value + '.');
      setDecimalPending(true);
    }
  };

  const finishDecimal = () => {
    setDecimalPending(false);
  };

  const clear = () => {
    memoizedValue.current = 0;
    setCurrentOperation('');
  };

  const onOperationClick = operation => () => {
    let currentValue = value;
    if (memoizedValue.current) {
      currentValue = onEqualClick();
    }
    setCurrentOperation(operation);
    memoizedValue.current = currentValue;
    setValue(0);
  };

  const onEqualClick = () => {
    switch (currentOperation) {
      case 'plus': {
        const res = memoizedValue.current + value;
        setValue(res);
        clear();
        return res;
      }
      case 'minus': {
        const res = memoizedValue.current - value;
        setValue(res);
        clear();
        return res;
      }
      case 'multiply': {
        const res = memoizedValue.current * value;
        setValue(res);
        clear();
        return res;
      }
      case 'divide': {
        const res = memoizedValue.current / value;
        setValue(res);
        clear();
        return res;
      }
      default: {
        return value;
      }
    }
  };

  return (
    <div className={container}>
      <div className={pad}>
        <div className={display}>{value}</div>
        <button onClick={onResetClick} className={btn}>
          AC
        </button>
        <button onClick={onNumberClick} className={btn} value={1}>
          1
        </button>
        <button onClick={onNumberClick} className={btn} value={2}>
          2
        </button>
        <button onClick={onNumberClick} className={btn} value={3}>
          3
        </button>
        <button onClick={onOperationClick('divide')} className={btn} disabled={decimalPending}>
          ÷
        </button>
        <button onClick={onNumberClick} className={btn} value={4}>
          4
        </button>
        <button onClick={onNumberClick} className={btn} value={5}>
          5
        </button>
        <button onClick={onNumberClick} className={btn} value={6}>
          6
        </button>
        <button onClick={onOperationClick('multiply')} className={btn} disabled={decimalPending}>
          ×
        </button>
        <button onClick={onNumberClick} className={btn} value={7}>
          7
        </button>
        <button onClick={onNumberClick} className={btn} value={8}>
          8
        </button>
        <button onClick={onNumberClick} className={btn} value={9}>
          9
        </button>
        <button onClick={onOperationClick('minus')} className={btn} disabled={decimalPending}>
          -
        </button>
        <button onClick={onNumberClick} className={btn} value={0}>
          0
        </button>
        <button onClick={onDecimalClick} className={btn} disabled={decimalPending}>
          .
        </button>
        <button onClick={onEqualClick} className={`${btn} ${btn_equal}`} disabled={decimalPending}>
          =
        </button>
        <button onClick={onOperationClick('plus')} className={btn} disabled={decimalPending}>
          +
        </button>
      </div>
    </div>
  );
}