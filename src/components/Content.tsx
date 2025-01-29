import { useSelector } from 'react-redux';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import { RootState } from '../store';

const Content: React.FC = () => {
  const form1Visible = useSelector(
    (state: RootState) => state.app.form1Visible
  );
  const form2Visible = useSelector(
    (state: RootState) => state.app.form2Visible
  );
  const form3Visible = useSelector(
    (state: RootState) => state.app.form3Visible
  );
  return (
    <div className="w-3/4 p-4 pt-0 pr-0">
      <div className="flex gap-4">
        {form1Visible && <Form1 />}
        {form2Visible && <Form2 />}
      </div>
      {form3Visible && <Form3 />}
    </div>
  );
};

export default Content;
