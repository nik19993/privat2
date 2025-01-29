import Content from './Content';
import Sidebar from './Sidebar';

const MainContent: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Content />
    </div>
  );
};

export default MainContent;
