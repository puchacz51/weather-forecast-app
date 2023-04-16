import { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import {
  singInWithGitHub,
  singInWithGoogle,
} from '../../utilities/supabase/signIn';

const SingInProviderOptions = () => {
  return (
    <div className='singInOptionsContainer'>
      <button className='singInBtn github' onClick={singInWithGitHub}>
        <BsGithub />
      </button>
      <button className='singInBtn google' onClick={singInWithGoogle}>
        <FcGoogle />
      </button>
    </div>
  );
};

export const SingInOptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='signInContainer'>
      <button
        className={`singInBtn ${isOpen && 'active'}`}
        onClick={() => setIsOpen((isOpen) => !isOpen)}>
        sing in
      </button>

      {isOpen && <SingInProviderOptions />}
    </div>
  );
};
