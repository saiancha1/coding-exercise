'use-client';
import {NumericFormat} from 'react-number-format';

interface CurrencyFormatProps {
  value: number;
  currency: string;
}

// Currency symbols for different currencies. Mapped by currency code.
const currencySymbols: { [key: string]: string } = {
  USD: '$', 
};

//Resuable component to format currency values
const CurrencyFormat = ({ value, currency } : CurrencyFormatProps) => {
  const formattedCurrency = currencySymbols[currency] || currency;
  return ( 
    <NumericFormat
    value={value}
    displayType={'text'}
    thousandSeparator={true}
    decimalScale={2}
    decimalSeparator='.'
    fixedDecimalScale={true}
    prefix={formattedCurrency + ' '}
    />
)
};

export default CurrencyFormat;