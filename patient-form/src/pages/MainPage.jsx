import React, { useState } from 'react';
import { Button, Checkbox, Progress, TextInput } from '@mantine/core';
import { Toaster, toast } from 'react-hot-toast';
import styles from './styles/MainPage.module.css';

const PatientForm = () => {
  const [phase, setPhase] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    address: '',
    email: '',
    phone: '',
    height: '',
    weight: '',
    alcoholYes: false,
    alcoholNo: false,
    alcoholFrequency: '',
    smokeYes: false,
    smokeNo: false,
    smokeFrequency: '',
    bloodType: '',
    conditions: '',
    familyMembers: [{ name: '', relationship: '', age: '' }],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFamilyMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFamilyMembers = [...formData.familyMembers];
    updatedFamilyMembers[index][name] = value;
    setFormData({
      ...formData,
      familyMembers: updatedFamilyMembers,
    });
  };

  const addFamilyMember = () => {
    setFormData({
      ...formData,
      familyMembers: [...formData.familyMembers, { name: '', relationship: '', age: '' }],
    });
  };

  const handleSubmit = () => {
    if (phase === 1) {
      const requiredFields = ['name', 'birthday', 'address', 'email', 'phone', 'height', 'weight'];
      const invalidFields = requiredFields.filter(field => {
        if (field === 'alcohol' || field === 'smoke') {
          return (formData[`${field}Yes`] && !formData[`${field}Frequency`]) || formData[`${field}No`];
        } else {
          return !formData[field];
        }
      });

      if (invalidFields.length > 0) {
        toast.error('You must fill out all required fields in order to proceed');
        return;
      }
    }

    if (phase === 2) {
      const requiredFields = ['bloodType', 'conditions'];
      const invalidFields = requiredFields.filter(field => !formData[field]);

      if (invalidFields.length > 0) {
        toast.error('You must fill out all required fields in order to proceed');
        return;
      }
    }

    console.log(formData);
    setPhase(phase + 1);
  };

  const handleGoBack = () => {
    window.location.href = window.location.href;
  };

  return (
    <div className={styles.mainContainer}>
      <Progress
        value={(phase / 4) * 100}
        color="teal"
        striped
        style={{ marginBottom: '1rem' }}
      />
      <Toaster position="top-center" />
      {phase === 1 && (
        <div className={styles.formContainer}>
          <h2>Basic Info</h2>
          <div className={styles.formSubContainer}>
            <div className={styles.formDivider}>
              <TextInput
                label="Name"
                type="text"
                name="name"
                placeholder="Full Name"
                withAsterisk
                onChange={handleInputChange}
                className={styles.name} />
              <TextInput
                label="Birthdate"
                type="date"
                name="birthday"
                placeholder="mm/dd/yyyy"
                withAsterisk
                onChange={handleInputChange}
                className={styles.birthdate} />
              <TextInput
                label="Address"
                type="text"
                name="address"
                placeholder="Complete Address"
                withAsterisk
                onChange={handleInputChange}
                className={styles.address} />
              <TextInput
                label="E-mail"
                type="text"
                name="email"
                placeholder="youremail@mail.com"
                withAsterisk
                onChange={handleInputChange}
                className={styles.email} />
            </div>
            <div className={styles.formDivider}>
              <TextInput
                label="Phone"
                type="number"
                name="phone"
                placeholder="Phone Number"
                withAsterisk
                onChange={handleInputChange}
                className={styles.phone} />
              <TextInput
                label="Height"
                type="number"
                name="height"
                placeholder="cm"
                withAsterisk
                onChange={handleInputChange}
                className={styles.height} />
              <TextInput
                label="Weight"
                type="number"
                name="weight"
                placeholder="kg"
                withAsterisk
                onChange={handleInputChange}
                className={styles.weight} />
            </div>
          </div>
        </div>
      )}
      {phase === 2 && (
        <div className={styles.formContainer}>
          <h2>Medical History</h2>
          <div className={styles.formSubContainer}>
            <div className={styles.formDivider}>
              <label>Do you drink alcohol?</label>
              <Checkbox label="Yes" type="checkbox" name="alcoholYes" onChange={handleInputChange} />
              <Checkbox label="No" type="checkbox" name="alcoholNo" onChange={handleInputChange} />
              {formData.alcoholYes && (
                <TextInput
                  name="alcoholFrequency"
                  placeholder="How often?"
                  onChange={handleInputChange}
                  className={styles.alcohol}
                />
              )}
            </div>
            <div className={styles.formDivider}>
              <label>Do you smoke?</label>
              <Checkbox label="Yes" type="checkbox" name="smokeYes" onChange={handleInputChange} />
              <Checkbox label="No" type="checkbox" name="smokeNo" onChange={handleInputChange} />
              {formData.smokeYes && (
                <TextInput
                  name="smokeFrequency"
                  placeholder="How often?"
                  onChange={handleInputChange}
                  className={styles.smoke}
                />
              )}
            </div>
            <div className={styles.formDivider}>
              <TextInput
                label="Bloodtype"
                type="text"
                name="bloodType"
                placeholder="Bloodtype"
                withAsterisk
                onChange={handleInputChange}
                className={styles.blood} />
              <TextInput
                label="Other medical conditions"
                type="text"
                name="conditions"
                placeholder="Enumerate separated by commas for multiples"
                withAsterisk onChange={handleInputChange}
                className={styles.conditions} />
            </div>
          </div>
        </div>
      )}
      {phase === 3 && (
        <div className={styles.formContainer}>
          <h2>Family Relations</h2>
          <div className={styles.formFamContainer}>
            <div className={styles.formFamilyMain}>
              {formData.familyMembers.map((member, index) => (
                <div key={index} className={styles.formFamilySub}>
                  <TextInput
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={member.name}
                    onChange={(e) => handleFamilyMemberChange(index, e)}
                    className={styles.famName}
                  />
                  <TextInput
                    label="Age"
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={member.age}
                    onChange={(e) => handleFamilyMemberChange(index, e)}
                    className={styles.famAge}
                  />
                  <TextInput
                    label="Relationship"
                    type="text"
                    name="relationship"
                    placeholder="Relation to You"
                    value={member.relationship}
                    onChange={(e) => handleFamilyMemberChange(index, e)}
                    className={styles.famRelationship}
                  />
                </div>
              ))}
            </div>
            <Button onClick={addFamilyMember}>Add Family Member</Button>
          </div>
        </div>
      )}
      {phase === 4 && (
        <div className={styles.mainContainer}>
          <h2>Confirmation</h2>
          <h4>Please check before submission:</h4>
          <div className={styles.summarySubContainer}>
            <div className={styles.summaryDivider}>
              <ul>
                <li><strong>Name:</strong> {formData.name}</li>
                <li><strong>Birthdate:</strong> {formData.birthday}</li>
                <li><strong>Address:</strong> {formData.address}</li>
                <li><strong>Email:</strong> {formData.email}</li>
                <li><strong>Phone:</strong> {formData.phone}</li>
                <li><strong>Height:</strong> {formData.height} cm</li>
                <li><strong>Weight:</strong> {formData.weight} kg</li>
                <li><strong>Do you drink alcohol?:</strong> {formData.alcoholYes ? 'Yes' : 'No'}</li>
                {formData.alcoholYes && <li><strong>Alcohol Frequency:</strong> {formData.alcoholFrequency}</li>}
              </ul>
            </div>
            <div className={styles.summaryDivider}>
              <ul>
                <li><strong>Do you smoke?:</strong> {formData.smokeYes ? 'Yes' : 'No'}</li>
                {formData.smokeYes && <li><strong>Smoke Frequency:</strong> {formData.smokeFrequency}</li>}
                <li><strong>Bloodtype:</strong> {formData.bloodType}</li>
                <li><strong>Other medical conditions:</strong> {formData.conditions}</li>
                <li><strong>Family Members:</strong></li>
                {formData.familyMembers.map((member, index) => (
                  <ul key={index}>
                    <li><strong>Family Member {index + 1}:</strong></li>
                    <li><strong>Name:</strong> {member.name}</li>
                    <li><strong>Age:</strong> {member.age}</li>
                    <li><strong>Relationship:</strong> {member.relationship}</li>
                  </ul>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {phase === 5 && (
        <div>
          <h2>Your form has been submitted. Thank you!</h2>
          <Button onClick={handleGoBack}>Go Back</Button>
        </div>
      )}
      {phase < 4 && (
        <Button onClick={handleSubmit}>Next</Button>
      )}
      {phase === 4 && (
        <Button onClick={handleSubmit}>Submit</Button>
      )}
    </div>
  );
};

export default PatientForm;
