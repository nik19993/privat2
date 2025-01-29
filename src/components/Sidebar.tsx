import { useDispatch, useSelector } from 'react-redux';
import Button from './inputs/Button';
import { AppDispatch, RootState, setFormVisibility } from '../store';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const form1Visible = useSelector(
    (state: RootState) => state.app.form1Visible
  );
  const form2Visible = useSelector(
    (state: RootState) => state.app.form2Visible
  );
  const form3Visible = useSelector(
    (state: RootState) => state.app.form3Visible
  );

  const showForm1Handler = () => {
    dispatch(setFormVisibility({ form: 'form1', visible: true }));
    dispatch(setFormVisibility({ form: 'form2', visible: false }));
    dispatch(setFormVisibility({ form: 'form3', visible: false }));
  };

  const showForm2Handler = () => {
    dispatch(setFormVisibility({ form: 'form1', visible: false }));
    dispatch(setFormVisibility({ form: 'form2', visible: true }));
    dispatch(setFormVisibility({ form: 'form3', visible: false }));
  };
  const showForm3Handler = () => {
    dispatch(setFormVisibility({ form: 'form1', visible: false }));
    dispatch(setFormVisibility({ form: 'form2', visible: false }));
    dispatch(setFormVisibility({ form: 'form3', visible: true }));
  };

  const showAllHandler = () => {
    dispatch(setFormVisibility({ form: 'form1', visible: true }));
    dispatch(setFormVisibility({ form: 'form2', visible: true }));
    dispatch(setFormVisibility({ form: 'form3', visible: true }));
  };
  return (
    <div className="w-1/4   ">
      <div className="flex flex-col gap-2 border p-4">
        <Button
          text="Відобразити всі форми"
          className="bg-blue-500 p-2"
          onClick={showAllHandler}
        />
        <Button
          text="Тільки форма #1"
          className="bg-blue-500 p-2"
          onClick={showForm1Handler}
        />
        <Button
          text="Тільки форма #2"
          className="bg-blue-500 p-2"
          onClick={showForm2Handler}
        />
        <Button
          text="Тільки форма #3"
          className="bg-blue-500 p-2"
          onClick={showForm3Handler}
        />
      </div>
    </div>
  );
};
export default Sidebar;
