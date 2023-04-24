import { Session } from '@supabase/supabase-js';
import defualtPicture from '../../assets/moon.png';
import { useState } from 'react';
import { supabase } from '../../utilities/supabase/supabase';
import { useRootStore } from '../../store/store';
export const ProfileInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useRootStore((state) => state.session) as Session;
  user.user_metadata;
  let picture = defualtPicture;
  if (user.user_metadata?.picture) {
    picture = user.user_metadata?.picture;
  }
  const handleLogOut = () => {
    supabase.auth.signOut();
    setIsOpen(false);
  };
  return (
    <div className='profileInfoWrapper'>
      <button
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        className='profileBtn'>
        <img src={picture} alt='profile avatar' />
        {isOpen && (
          <div className='profileInfoList'>
            <button onClick={handleLogOut} className='logOutBtn'>
              log out
            </button>
          </div>
        )}
      </button>
    </div>
  );
};
