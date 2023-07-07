import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onCheckbox, isChecked }) {

 return (
    <div className='checkbox'>
      <>
        <input
          type='checkbox'
          role='switch'
          id='switch'
          name='сheckbox'
          className='checkbox__input'
          onChange={onCheckbox}
          checked={isChecked? true : false}
        />
        <label htmlFor='switch' className='checkbox__label'/>
      </>
      <span className='checkbox__text'>Короткометражки</span>
    </div>
  ); 
}

export default FilterCheckbox;
