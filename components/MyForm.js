import React, { Component } from 'react';
import { compose, withHandlers, withProps, withState, withStateHandlers } from "recompose";
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { withFormData, withFormHandlers } from "./withFormData";

class MyForm extends Component {
    render() {
        let { formData: { name, age }, sendForm, updateFormData, formErrors } = this.props;

        return (
            <View>
                <View>
                    <TextInput
                        style={styles.textfield}
                        onChangeText={(name) => updateFormData({ name: 'name', value: name })}
                        value={name}
                    />
                    <Text>{formErrors.name}</Text>

                    <TextInput
                        style={styles.textfield}
                        onChangeText={(age) => updateFormData({ name: 'age', value: age })}
                        value={age}
                    />
                    <Text>{formErrors.age}</Text>
                </View>
                <View style={ styles.button }>
                <Button
                  onPress={(sendForm)}
                  title="Send"  />
                </View>
            </View>
        )
    }
}

let isNonEmpty = (value) => (value && value.replace(/^\s+/g, '').length > 0);
let isGreatherThan = (rule) => (value) => (value > rule);

let validators = {
    "name": [[isNonEmpty, "Please enter your name"]],
    "age": [
        [isNonEmpty, "Please enter your age"],
        [isGreatherThan(17), "You should be over the age of 18"]]
}

const enhance = compose(
    withFormData({ name: 'Eric', age: '18' }),
    withFormHandlers({
        rules: validators,
        onSuccess: (props) => {
            // form is valid
            console.log('success')
        },
        onFail: (props) => {
            // form is invalid
            console.log('fail')
        }
    })
)

const enhanced = enhance(MyForm);

const styles = StyleSheet.create({
  textfield: {
    borderWidth: 1,
    //flex: 1,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    padding: 5,
  },

  button: {
    alignItems: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  }
});

export default enhanced;
