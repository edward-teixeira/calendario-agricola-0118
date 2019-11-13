import React, { useState} from 'react';
import { View, Card, Text,  Input } from 'react-native-elements';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import  DatePicker  from "react-native-datepicker";

//Data Inicio => Date Picker
//Nome => Text Input
//Tipo de Plantio => Semente ou muda => Radio BUtton

const CreatePlantacaoForm = () => {
    this.state = {
        checked: 'first',
    };
    const { checked } = this.state;

    return (
        <Card>
            <RadioButton.Group
            onValueChange={value => this.setState({ value })}
            value={this.state.value}
        >

            <TextInput
                type="outlined"
                placeholder="Nome"
            />
            <RadioButton
                value="muda"

                />
            <RadioButton
                value="semente"
            />
            </RadioButton.Group>
        </Card>
    )
};

export default CreatePlantacaoForm;
