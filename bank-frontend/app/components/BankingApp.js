'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownLeft, History, LogOut, CreditCard, Bell, Settings, Shield } from 'lucide-react';

// LoginForm Component
const LoginForm = ({ 
  currentView, 
  setCurrentView, 
  handleLogin, 
  handleSignup, 
  loading, 
  message,
  loginForm,
  setLoginForm,
  signupForm,
  setSignupForm
}) => {
  const usernameRef = useRef(null);
  
  useEffect(() => {
    if (currentView === 'login' && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [currentView]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">NeoBank</h1>
          <p className="text-gray-600">Your trusted banking partner</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            message.toLowerCase().includes('success')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="flex mb-6">
          <button
            type="button"
            onClick={() => {
              setCurrentView('login');
              setLoginForm({ username: '', password: '' });
            }}
            className={`flex-1 py-2 px-4 rounded-l-lg font-medium transition-colors ${
              currentView === 'login'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentView('signup');
              setSignupForm({ username: '', password: '' });
            }}
            className={`flex-1 py-2 px-4 rounded-r-lg font-medium transition-colors ${
              currentView === 'signup'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Sign Up
          </button>
        </div>
        
        <div className="space-y-4">
          {currentView === 'login' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  ref={usernameRef}
                  value={loginForm.username}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={signupForm.username}
                  onChange={handleSignupChange}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Choose a username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={signupForm.password}
                  onChange={handleSignupChange}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Choose a password"
                />
              </div>
              <button
                type="button"
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Create Account'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// TransactionForm Component
const TransactionForm = ({ type, onBack, handleDeposit, handleWithdraw, handleTransfer, loading, message }) => {
  const [formAmount, setFormAmount] = useState('');
  const [formTransferUsername, setFormTransferUsername] = useState('');

  const handleSubmit = () => {
    if (type === 'deposit') {
      handleDeposit(formAmount);
    } else if (type === 'withdraw') {
      handleWithdraw(formAmount);
    } else if (type === 'transfer') {
      handleTransfer(formTransferUsername, formAmount);
    }
    setFormAmount('');
    setFormTransferUsername('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {type === 'deposit'
            ? 'Deposit Funds'
            : type === 'withdraw'
            ? 'Withdraw Funds'
            : 'Transfer Funds'}
        </h1>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          {message && (
            <div className={`mb-4 p-3 rounded-lg text-center ${
              message.toLowerCase().includes('success') || message.toLowerCase().includes('insufficient')
                ? message.toLowerCase().includes('success') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}
          
          <div className="space-y-4">
            {type === 'transfer' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Username
                </label>
                <input
                  type="text"
                  value={formTransferUsername}
                  onChange={(e) => setFormTransferUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter recipient username"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter amount"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                         transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// TransactionHistory Component
const TransactionHistory = ({ transactions, setCurrentView, handleLogout }) => (
  <div className="flex flex-col min-h-screen bg-gray-100 p-4 md:p-8">
    <header className="bg-white shadow-sm p-4 flex items-center justify-between mb-4">
      <button
        onClick={() => setCurrentView('dashboard')}
        className="text-gray-600 hover:text-blue-600 transition-colors"
      >
        &larr; Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </header>
    <main className="flex-1">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <div
                key={index}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">{tx.type}</p>
                  <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleString()}</p>
                </div>
                <div
                  className={`font-bold ${
                    tx.type === 'Deposit'
                      ? 'text-green-600'
                      : tx.type === 'Withdraw'
                      ? 'text-red-600'
                      : 'text-blue-600'
                  }`}
                >
                  ${tx.amount.toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No transactions found</div>
          )}
        </div>
      </div>
    </main>
  </div>
);

// Dashboard Component - Updated (removed monthly income/expenses/savings)
const Dashboard = ({ user, balance, transactions, setCurrentView, handleLogout, message }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-full p-2">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">NeoBank</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Settings className="w-5 h-5" />
              </button>
              <div className="text-right hidden md:block">
                <p className="text-sm text-gray-600">Welcome back</p>
                <p className="font-medium text-gray-900">{user?.username}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.toLowerCase().includes('success') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 font-medium">Available Balance</p>
              <h2 className="text-4xl font-bold mt-2">${balance.toFixed(2)}</h2>
              <p className="text-blue-100 mt-2">Account: {user?.accountNumber || '•••• •••• ••••'}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setCurrentView('deposit')}
            className="bg-white rounded-xl p-5 flex flex-col items-center justify-center space-y-3 hover:shadow-md transition-all border border-gray-100 hover:border-blue-100"
          >
            <div className="bg-green-100 p-3 rounded-full">
              <ArrowDownLeft className="w-6 h-6 text-green-600" />
            </div>
            <span className="font-medium text-gray-700 text-sm">Deposit</span>
          </button>
          
          <button
            onClick={() => setCurrentView('withdraw')}
            className="bg-white rounded-xl p-5 flex flex-col items-center justify-center space-y-3 hover:shadow-md transition-all border border-gray-100 hover:border-blue-100"
          >
            <div className="bg-red-100 p-3 rounded-full">
              <ArrowUpRight className="w-6 h-6 text-red-600" />
            </div>
            <span className="font-medium text-gray-700 text-sm">Withdraw</span>
          </button>
          
          <button
            onClick={() => setCurrentView('transfer')}
            className="bg-white rounded-xl p-5 flex flex-col items-center justify-center space-y-3 hover:shadow-md transition-all border border-gray-100 hover:border-blue-100"
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <ArrowUpRight className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-medium text-gray-700 text-sm">Transfer</span>
          </button>
          
          <button
            onClick={() => setCurrentView('history')}
            className="bg-white rounded-xl p-5 flex flex-col items-center justify-center space-y-3 hover:shadow-md transition-all border border-gray-100 hover:border-blue-100"
          >
            <div className="bg-purple-100 p-3 rounded-full">
              <History className="w-6 h-6 text-purple-600" />
            </div>
            <span className="font-medium text-gray-700 text-sm">History</span>
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
            <button 
              onClick={() => setCurrentView('history')}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all
            </button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {transactions.slice(0, 5).map((tx, index) => (
              <div
                key={index}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    tx.type === 'Deposit' 
                      ? 'bg-green-100 text-green-600' 
                      : tx.type === 'Withdraw' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {tx.type === 'Deposit' 
                      ? <ArrowDownLeft className="w-4 h-4" /> 
                      : tx.type === 'Withdraw' 
                      ? <ArrowUpRight className="w-4 h-4" /> 
                      : <ArrowUpRight className="w-4 h-4" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tx.type}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div
                  className={`font-semibold ${
                    tx.type === 'Deposit'
                      ? 'text-green-600'
                      : tx.type === 'Withdraw'
                      ? 'text-red-600'
                      : 'text-blue-600'
                  }`}
                >
                  {tx.type === 'Deposit' ? '+' : '-'}${tx.amount.toFixed(2)}
                </div>
              </div>
            ))}
            
            {transactions.length === 0 && (
              <div className="px-6 py-8 text-center">
                <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No transactions yet</p>
                <p className="text-sm text-gray-400 mt-1">Your transactions will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800">Security Notice</h4>
            <p className="text-sm text-blue-600 mt-1">
              Your account is protected by advanced security measures. Always keep your login credentials secure and never share them with anyone.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Main BankingApp Component
const BankingApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [signupForm, setSignupForm] = useState({ username: '', password: '' });

  // Try different common ports if 8081 doesn't work
  const API_BASE = 'http://localhost:8080';

  const showMessage = useCallback((msg, isError = false) => {
    setMessage(msg);
    if (!isError) {
      setTimeout(() => setMessage(''), 5000);
    }
  }, []);

  // Add transaction to local state (for demo purposes)
  const addTransaction = (type, amount) => {
    const newTransaction = {
      type,
      amount: parseFloat(amount),
      date: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleLogin = async () => {
    if (!loginForm.username.trim() || !loginForm.password.trim()) {
      showMessage('Please enter both username and password', true);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', loginForm.username);
      formData.append('password', loginForm.password);

      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const result = await response.text();
      if (result.includes('Success')) {
        setIsLoggedIn(true);
        setUser({ username: loginForm.username, accountNumber: '1234 5678 9012 3456', balance: 0 });
        setCurrentView('dashboard');
        await fetchBalance();
        showMessage('Login successful!');
        setLoginForm({ username: '', password: '' });
      } else {
        showMessage(result, true);
      }
    } catch (error) {
      showMessage('Login failed. Please try again.', true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!signupForm.username.trim() || !signupForm.password.trim()) {
      showMessage('Please enter both username and password', true);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', signupForm.username);
      formData.append('password', signupForm.password);

      const response = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (response.status >= 200 && response.status < 300) {
        showMessage('Account created successfully! Please login.');
        setCurrentView('login');
        setSignupForm({ username: '', password: '' });
      } else {
        const errorText = await response.text();
        showMessage(errorText || 'Signup failed. Username may already exist.', true);
      }
    } catch (error) {
      showMessage('Network error. Please check your connection and try again.', true);
    } finally {
      setLoading(false);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await fetch(`${API_BASE}/balance`, { credentials: 'include' });
      if (response.ok) {
        const balance = await response.json();
        setBalance(balance);
      }
    } catch (error) {
      console.error('Failed to fetch balance');
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE}/history`, { credentials: 'include' });
      if (response.ok) {
        const transactions = await response.json();
        setTransactions(transactions);
      }
    } catch (error) {
      console.error('Failed to fetch transactions');
    }
  };

  const handleDeposit = async (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      showMessage('Enter a valid amount', true);
      return;
    }

    setLoading(true);
    try {
      // Try API call first
      const formData = new FormData();
      formData.append('amount', numericAmount.toString());

      const response = await fetch(`${API_BASE}/deposit`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        await fetchBalance(); // Refresh balance from server
        showMessage('Deposit successful');
        setCurrentView('dashboard');
      } else {
        throw new Error('API call failed');
      }
    } catch (error) {
      // Fallback to local state update if API fails
      setBalance((prev) => prev + numericAmount);
      addTransaction('Deposit', numericAmount);
      showMessage('Deposit successful (offline mode)');
      setCurrentView('dashboard');
    } finally {
      setLoading(false);
    }
  };
  
  const handleWithdraw = async (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      showMessage('Enter a valid amount', true);
      return;
    }
    if (numericAmount > balance) {
      showMessage('Insufficient balance', true);
      return;
    }

    setLoading(true);
    try {
      // Try API call first
      const formData = new FormData();
      formData.append('amount', numericAmount.toString());

      const response = await fetch(`${API_BASE}/withdraw`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        await fetchBalance(); // Refresh balance from server
        showMessage('Withdrawal successful');
        setCurrentView('dashboard');
      } else {
        throw new Error('API call failed');
      }
    } catch (error) {
      // Fallback to local state update if API fails
      setBalance((prev) => prev - numericAmount);
      addTransaction('Withdraw', numericAmount);
      showMessage('Withdrawal successful (offline mode)');
      setCurrentView('dashboard');
    } finally {
      setLoading(false);
    }
  };
  
  const handleTransfer = async (username, amount) => {
    const numericAmount = parseFloat(amount);
    if (!username) {
      showMessage('Recipient username required', true);
      return;
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      showMessage('Enter a valid amount', true);
      return;
    }
    if (numericAmount > balance) {
      showMessage('Insufficient balance', true);
      return;
    }

    setLoading(true);
    try {
      // Try API call first
      const formData = new FormData();
      formData.append('recipient', username);
      formData.append('amount', numericAmount.toString());

      const response = await fetch(`${API_BASE}/transfer`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        await fetchBalance(); // Refresh balance from server
        showMessage(`Transfer to ${username} successful`);
        setCurrentView('dashboard');
      } else {
        throw new Error('API call failed');
      }
    } catch (error) {
      // Fallback to local state update if API fails
      setBalance((prev) => prev - numericAmount);
      addTransaction('Transfer', numericAmount);
      showMessage(`Transfer to ${username} successful (offline mode)`);
      setCurrentView('dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, { method: 'POST', credentials: 'include' });
      setIsLoggedIn(false);
      setCurrentView('login');
      setUser(null);
      setBalance(0);
      setTransactions([]);
      setLoginForm({ username: '', password: '' });
      setSignupForm({ username: '', password: '' });
      showMessage('Logged out successfully!');
    } catch (error) {
      showMessage('Logout failed', true);
    }
  };

  useEffect(() => {
    if (currentView === 'history' && isLoggedIn) {
      fetchTransactions();
    }
  }, [currentView, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <LoginForm
        currentView={currentView}
        setCurrentView={setCurrentView}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        loading={loading}
        message={message}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        signupForm={signupForm}
        setSignupForm={setSignupForm}
      />
    );
  }

  if (currentView === 'dashboard') return (
    <Dashboard
      user={user}
      balance={balance}
      transactions={transactions}
      setCurrentView={setCurrentView}
      handleLogout={handleLogout}
      message={message}
    />
  );
  
  if (['deposit', 'withdraw', 'transfer'].includes(currentView)) {
    return (
      <TransactionForm
        type={currentView}
        onBack={() => setCurrentView('dashboard')}
        handleDeposit={handleDeposit}
        handleWithdraw={handleWithdraw}
        handleTransfer={handleTransfer}
        loading={loading}
        message={message}
      />
    );
  }
  
  if (currentView === 'history') return (
    <TransactionHistory
      transactions={transactions}
      setCurrentView={setCurrentView}
      handleLogout={handleLogout}
    />
  );

  return null;
};

export default BankingApp;