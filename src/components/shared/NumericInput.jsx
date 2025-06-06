import { NumericFormat } from 'react-number-format'
import Input from '@/components/ui/Input'

const NumberInput = ({ inputSuffix, inputPrefix, ...props }) => {
    return (
        <Input
            {...props}
            value={props.value}
            suffix={inputSuffix}
            prefix={inputPrefix}
        />
    )
}

const NumberFormatInput = ({ onValueChange, ...rest }) => {
    return (
        <NumericFormat
            customInput={NumberInput}
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

const NumericInput = ({ inputSuffix, inputPrefix, onValueChange, ...rest }) => {
    return (
        <NumberFormatInput
            inputPrefix={inputPrefix}
            inputSuffix={inputSuffix}
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

export default NumericInput
