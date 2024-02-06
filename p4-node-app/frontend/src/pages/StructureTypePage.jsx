import { Link, useNavigate } from 'react-router-dom';
import { Button, Image, Select } from 'antd';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Tooltip from "@/components/Tooltip";
import { useSelectionContext } from "@/components/SelectionContext";

const { Option } = Select;

function StructureTypePage() {
  const {
    selectedStrucType,
    setSelectedStrucType,
    setSelectedUnit: setSelectedUnitContext,
  } = useSelectionContext();

  const [selectedText, setSelectedText] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    switch (selectedStrucType) {
      case 'concreteSlab':
        setSelectedText('Unreinforced Conc. Slab');
        break;
      case 'chbWall':
        setSelectedText('Unreinforced CHB Wall');
        break;
      default:
        setSelectedText('');
    }
  }, [selectedStrucType]);

  const handleCardClick = (type) => {
    setSelectedStrucType(type);
  };

  const handleUnitChange = (value) => {
    setSelectedUnit(value);
  };

  const handleConfirm = () => {
    if (!selectedStrucType) {
      toast.error('Please choose a structure type.');
      return;
    }
    if (!selectedUnit) {
      toast.error('Please choose a unit.');
      return;
    }
    setSelectedUnitContext(selectedUnit);
    navigate('/shape');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', paddingBottom: '20px' }}>
      <Toaster position="top-center" />
      <Link to='/'>
        <Button type='primary' style={{ position: 'fixed', left: '10%' }}>←</Button>
      </Link>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px', gap: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>Choose Type of Structure
          <Tooltip content={<img src='./images/struc-type.jpg' alt="struc-type-img" />} >
            <p>?</p>
          </Tooltip>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
          <h5 style={{ position: 'absolute', top: '17%', left: '50%', transform: 'translate(-50%, -50%)' }}>{selectedText}</h5>
          <div style={{ border: 'solid 0.5px rgba(0, 0, 0, 0.486)', borderRadius: '5px', transition: 'transform 0.3s ease-in-out', borderRadius: '8px', overflow: 'hidden', marginBottom: '40px', cursor: 'pointer' }} onClick={() => handleCardClick('concreteSlab')}>
            <img style={{ padding: '5px', height: '130px', width: '130px' }} src='./images/concrete-slab.png' alt='slab-img' />
          </div>
          <div style={{ border: 'solid 0.5px rgba(0, 0, 0, 0.486)', borderRadius: '5px', transition: 'transform 0.3s ease-in-out', borderRadius: '8px', overflow: 'hidden', marginBottom: '40px', cursor: 'pointer' }} onClick={() => handleCardClick('chbWall')}>
            <img style={{ padding: '5px', height: '130px', width: '130px' }} src='./images/chb-wall.png' alt='chbwall-img' />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '-20px' }}>
          <h3 style={{ marginBottom: '15px' }}>Choose Unit of Measurement</h3>
          <select
            placeholder="Select Unit"
            onChange={(e) => handleUnitChange(e.target.value)}
            value={selectedUnit}
            style={{ width: '200px', fontSize: '16px', padding: '8px' }}
          >
            <option value=''>Select Unit</option>
            <option value='meter'>Metric meter, m</option>
          </select>
          <Button type='primary' onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}

export default StructureTypePage;
