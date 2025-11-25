import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaEnvelopeOpen, FaTrash } from 'react-icons/fa';
import { useFetch } from '../../../hooks/useFetch';
import { getAllMessages, markAsRead, deleteMessage } from '../../../services/contactService';
import Loader from '../../../components/common/loader/Loader';
import ErrorMessage from '../../../components/common/error-message/ErrorMessage';
import { formatDate } from '../../../utils/formatDate';
import './ViewMessages.css';

const ViewMessages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { data: messages, loading, error, refetch } = useFetch(getAllMessages);

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);
      refetch();
    } catch {
      alert('Failed to mark as read');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
        refetch();
      } catch {
        alert('Failed to delete message');
      }
    }
  };

  if (loading) return <Loader fullScreen size="large" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="view-messages-page">
      <div className="messages-header">
        <h1 className="messages-title">Contact Messages</h1>
        <p className="messages-subtitle">
          {messages?.filter((m) => !m.read).length || 0} unread messages
        </p>
      </div>

      <div className="messages-layout">
        {/* Messages List */}
        <div className="messages-list">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <motion.div
                key={message._id}
                className={`message-item ${!message.read ? 'unread' : ''} ${
                  selectedMessage?._id === message._id ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.read) handleMarkRead(message._id);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="message-icon">
                  {message.read ? <FaEnvelopeOpen size={20} /> : <FaEnvelope size={20} />}
                </div>

                <div className="message-preview">
                  <div className="message-from">
                    <strong>{message.name}</strong>
                    {!message.read && <span className="unread-badge">New</span>}
                  </div>
                  <p className="message-subject">{message.subject || 'No subject'}</p>
                  <p className="message-date">{formatDate(message.createdAt)}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="empty-messages">
              <p>No messages yet</p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="message-detail">
          {selectedMessage ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="message-content">
              <div className="message-detail-header">
                <div>
                  <h2>{selectedMessage.name}</h2>
                  <p className="message-email">{selectedMessage.email}</p>
                  <p className="message-date-detail">{formatDate(selectedMessage.createdAt)}</p>
                </div>

                <button onClick={() => handleDelete(selectedMessage._id)} className="delete-btn-large">
                  <FaTrash size={16} />
                  Delete
                </button>
              </div>

              {selectedMessage.subject && (
                <div className="message-subject-box">
                  <strong>Subject:</strong> {selectedMessage.subject}
                </div>
              )}

              <div className="message-body">
                <strong>Message:</strong>
                <p>{selectedMessage.message}</p>
              </div>

              <div className="message-actions">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${
                    selectedMessage.subject || 'Your message'
                  }`}
                  className="reply-btn"
                >
                  Reply via Email
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="no-message-selected">
              <FaEnvelope size={48} />
              <p>Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMessages;
