import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup'

import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService'

import './charSearchForm.scss'

const AppForm = () => {
    const [char, setChar] = useState(null)
    const {getCharacterByName, clearError, process, setProcess} = useMarvelService()

    const updateChar = (name) => { 
        clearError()
        getCharacterByName(name).then(setChar).then(() => setProcess('confirmed'))
    }

    const errorMessage =  process === 'error' ? <div>{ErrorMessage}</div> : null
    const results = !char ? null : char.length > 0 ? 
                    <div className="searchOk">
                        <div className="searchOk__descr">There is! Visit name page?</div>
                        <Link to={`/characters/${char[0].id}`}>
                            <button className="button button__secondary">
                                <div className="inner">to page</div>
                            </button>
                        </Link>
                    </div> :
                    <div className="searchError">
                        The character was not found. Check the name and try again    
                    </div> 

    return (
        <Formik
            initialValues = {{
                charName: '',
            }}
            validationSchema = {Yup.object({
                charName: Yup.string().required("Enter a name")
            })}
            onSubmit = {({charName}) => updateChar(charName)}
        >

            <Form className="form">
                <div className="form__title">Or find a character by name:</div>
                <div className="search">
                    <Field 
                        name='charName'
                        type="text" 
                        placeholder='Enter name'/>
                    <button 
                        className="button button__main" 
                        type="submit"
                        disabled={process === 'loading' ? true : false}>
                        <div className="inner">FIND</div>
                    </button>
                </div>
                <FormikErrorMessage className="error" name="charName" component="div"/>
                {results}
                {errorMessage}
            </Form>
        </Formik>
    )
}

export default AppForm
