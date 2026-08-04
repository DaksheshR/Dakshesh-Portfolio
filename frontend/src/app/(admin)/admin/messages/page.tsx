/**
 * Admin — Contact messages inbox page.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { adminService } from "@/services/portfolio.service";
import { timeAgo } from "@/utils/helpers";
import type { ContactMessage } from "@/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const loadMessages = useCallback(async () => {
    try {
      const data = await adminService.getMessages();
      setMessages(data);
    } catch { /* empty */ }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleMarkRead = async (msg: ContactMessage) => {
    try {
      await adminService.markMessageRead(msg.id);
      loadMessages();
    } catch { /* empty */ }
  };

  const handleDelete = async (msg: ContactMessage) => {
    if (!confirm(`Delete message from "${msg.name}"?`)) return;
    try {
      await adminService.deleteMessage(msg.id);
      if (selectedMessage?.id === msg.id) setSelectedMessage(null);
      loadMessages();
    } catch { /* empty */ }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => <div key={i} className="skeleton h-20 w-full" />)}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark tracking-tight">
              Messages
            </h1>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-0.5">
              Contact form submissions
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="accent" size="md">{unreadCount} unread</Badge>
          )}
        </div>
      </div>

      {messages.length === 0 ? (
        <Card className="text-center py-16">
          <svg className="w-10 h-10 mx-auto mb-3 text-text-muted-light dark:text-text-muted-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">No messages yet</p>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Message list */}
          <div className="lg:col-span-2 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.is_read) handleMarkRead(msg);
                }}
                className={`w-full text-left p-3.5 rounded-lg transition-all duration-150 cursor-pointer ${
                  selectedMessage?.id === msg.id
                    ? "bg-surface-muted-light dark:bg-surface-elevated-dark border border-primary-500/30"
                    : "bg-white dark:bg-surface-card-dark border border-border-light dark:border-border-dark hover:border-border-hover-light dark:hover:border-border-hover-dark"
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className={`text-sm font-semibold ${!msg.is_read ? "text-text-primary-light dark:text-text-primary-dark" : "text-text-secondary-light dark:text-text-secondary-dark"}`}>
                    {msg.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {!msg.is_read && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{timeAgo(msg.created_at)}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark truncate">
                  {msg.subject}
                </p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate mt-0.5">
                  {msg.message}
                </p>
              </button>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-3">
            {selectedMessage ? (
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                      {selectedMessage.subject}
                    </h2>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      From: <span className="font-medium">{selectedMessage.name}</span> ({selectedMessage.email})
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">
                      {timeAgo(selectedMessage.created_at)}
                    </p>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(selectedMessage)}>
                    Delete
                  </Button>
                </div>
                <hr className="border-border-light dark:border-border-dark mb-4" />
                <p className="text-text-primary-light dark:text-text-primary-dark leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
                <div className="mt-6">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="inline-block"
                  >
                    <Button variant="outline" size="sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Reply via Email
                    </Button>
                  </a>
                </div>
              </Card>
            ) : (
              <Card className="text-center py-16">
                <svg className="w-12 h-12 mx-auto mb-3 text-text-muted-light dark:text-text-muted-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Select a message to view
                </p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
