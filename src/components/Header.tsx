import TextInput from './../components/inputs/TextInput';
import Button from './../components/inputs/Button';
import { useEffect, useRef, useState } from 'react';
import Mark from 'mark.js';

const Header: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const instance = new Mark(document.querySelectorAll('#root'));

    if (searchText) {
      instance.mark(searchText, {
        element: 'span',
        className: 'highlight',
      });
    } else {
      instance.unmark();
    }

    return () => {
      instance.unmark();
    };
  }, [searchText]);

  return (
    <div className="mb-4 flex">
      <TextInput
        placeholder="Дінамічний пошук введеного слова на сторінці  та маркування його кольором"
        className="flex-grow mr-2"
        type="text"
        onChange={handleInputChange}
        name="search"
        value={searchText}
      />
      <Button
        text="Перезавантажити сторінку"
        className="px-4 py-2"
        onClick={() => window.location.reload()}
      />
    </div>
  );
};
export default Header;
