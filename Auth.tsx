import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabaseClient';
import { useApp } from '../../contexts/AppContext';
import { Users } from 'lucide-react';

const Auth = () => {
  const { state, setGuestMode } = useApp();

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-dark-800 p-8 rounded-xl border border-dark-700">
        <h1 className="text-3xl font-bold text-center text-white mb-2">Singularity ∞ Family</h1>
        <p className="text-center text-gray-400 mb-8">Sign in to save your data or continue as a guest.</p>
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2563eb',
                  brandAccent: '#1d4ed8',
                  defaultButtonBackground: '#1e293b',
                  defaultButtonBackgroundHover: '#334155',
                  inputBackground: '#0f172a',
                  inputText: '#ffffff',
                  inputLabelText: '#9ca3af',
                  inputBorder: '#334155',
                  messageText: '#cbd5e1',
                  messageTextDanger: '#fca5a5',
                },
                space: {
                  spaceSmall: '4px',
                  spaceMedium: '8px',
                  spaceLarge: '16px',
                },
                radii: {
                  borderRadiusButton: '8px',
                  buttonBorderRadius: '8px',
                  inputBorderRadius: '8px',
                },
              },
            },
           }}
          providers={['google']}
          theme={state.theme === 'dark' ? 'dark' : 'default'}
        />
        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-dark-700"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-dark-700"></div>
        </div>
        <button
          onClick={setGuestMode}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
        >
          <Users size={18} />
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Auth;
