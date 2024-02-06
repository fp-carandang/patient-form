import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useSelectionContext } from "@/components/SelectionContext";
import toast, { Toaster } from "react-hot-toast";

function StructureShapePage() {
  const {
    selectedShape,
    setSelectedShape,
  } = useSelectionContext();

  const navigate = useNavigate();

  const handleShapeChange = (value) => {
    setSelectedShape(value);
  };

  const handleConfirm = () => {
    if (!selectedShape) {
      toast.error('Please choose a shape.')      
      return;
    }
    setSelectedShape(selectedShape);
    navigate('/input');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', paddingBottom: '20px' }}>
      <Toaster position="top-center" />
      <Link to='/type'>
        <Button type='primary' style={{ position: 'fixed', left: '10%' }}>←</Button>
      </Link>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', gap: '25px' }}>
        <h3>Choose Structure Shape</h3>
        <select
          placeholder="Select Shape"
          onChange={(e) => handleShapeChange(e.target.value)}
          value={selectedShape}
          style={{ width: '200px', fontSize: '16px', padding: '8px' }}
        >
          <option value=''>Select Shape</option>
          <option value='Rectangular'>Rectangular</option>
          <option value='Triangular'>Triangular</option>
          <option value='Circular'>Circular</option>
        </select>
        <Button type='primary' onClick={handleConfirm}>Confirm</Button>
        <br />
        <br />
        <br />
        <Link to='/tutorial'>
          <Button type='primary'>Hold on! The shape is irregular ☹️</Button>
        </Link>
      </div>
    </div>
  );
}

export default StructureShapePage;
