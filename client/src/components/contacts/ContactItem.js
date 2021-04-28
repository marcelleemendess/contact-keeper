import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext; // ?? from context

    const { _id, name, email, phone, type } = contact;
    
    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }
    
    return (
        <div className='card bg-light'>
            <h3 className='text=primary text-left'>
                {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' +
                        (type === 'professional' ? 'badge-success' : 'badge-primary')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {email && (<li>    {/*fields not require, it needs to check if exist */}
                    <i className='fas fa-envelope-open'></i> {email}
                </li>)}
                {phone && (<li>
                    <i className='fas fa-phone'></i> {phone}
                </li>)}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>Edit</button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
            </p>
        </div>
    )

};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
};

export default ContactItem

// chatAt(0).toUpperCase() - to make the first letter uppercase // the result gives us just the first letter uppercase (P),
//  + type.slice(1) to jump the first letter and add the rest onto it