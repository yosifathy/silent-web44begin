export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url: string | null;
          role: "user" | "designer" | "admin" | "super-admin";
          status: "active" | "inactive" | "suspended";
          xp: number;
          level: number;
          bio: string | null;
          skills: string[] | null;
          hourly_rate: number | null;
          created_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar_url?: string | null;
          role?: "user" | "designer" | "admin" | "super-admin";
          status?: "active" | "inactive" | "suspended";
          xp?: number;
          level?: number;
          bio?: string | null;
          skills?: string[] | null;
          hourly_rate?: number | null;
          created_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar_url?: string | null;
          role?: "user" | "designer" | "admin" | "super-admin";
          status?: "active" | "inactive" | "suspended";
          xp?: number;
          level?: number;
          bio?: string | null;
          skills?: string[] | null;
          hourly_rate?: number | null;
          created_at?: string;
          last_login?: string | null;
        };
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          icon: string;
          description: string;
          unlocked_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          icon: string;
          description: string;
          unlocked_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          icon?: string;
          description?: string;
          unlocked_at?: string;
        };
      };
      design_requests: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          priority: "low" | "medium" | "high";
          status:
            | "draft"
            | "submitted"
            | "in-progress"
            | "completed"
            | "delivered";
          user_id: string;
          designer_id: string | null;
          price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          priority?: "low" | "medium" | "high";
          status?:
            | "draft"
            | "submitted"
            | "in-progress"
            | "completed"
            | "delivered";
          user_id: string;
          designer_id?: string | null;
          price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          priority?: "low" | "medium" | "high";
          status?:
            | "draft"
            | "submitted"
            | "in-progress"
            | "completed"
            | "delivered";
          user_id?: string;
          designer_id?: string | null;
          price?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      files: {
        Row: {
          id: string;
          name: string;
          url: string;
          type: string;
          size: number;
          thumbnail: string | null;
          request_id: string | null;
          message_id: string | null;
          uploaded_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          url: string;
          type: string;
          size: number;
          thumbnail?: string | null;
          request_id?: string | null;
          message_id?: string | null;
          uploaded_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          url?: string;
          type?: string;
          size?: number;
          thumbnail?: string | null;
          request_id?: string | null;
          message_id?: string | null;
          uploaded_by?: string;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          status:
            | "new"
            | "in-progress"
            | "needs-feedback"
            | "revisions"
            | "completed";
          priority: "low" | "medium" | "high" | "urgent";
          client_name: string;
          client_email: string | null;
          designer_id: string | null;
          budget: number | null;
          estimated_hours: number | null;
          actual_hours: number;
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          status?:
            | "new"
            | "in-progress"
            | "needs-feedback"
            | "revisions"
            | "completed";
          priority?: "low" | "medium" | "high" | "urgent";
          client_name: string;
          client_email?: string | null;
          designer_id?: string | null;
          budget?: number | null;
          estimated_hours?: number | null;
          actual_hours?: number;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          status?:
            | "new"
            | "in-progress"
            | "needs-feedback"
            | "revisions"
            | "completed";
          priority?: "low" | "medium" | "high" | "urgent";
          client_name?: string;
          client_email?: string | null;
          designer_id?: string | null;
          budget?: number | null;
          estimated_hours?: number | null;
          actual_hours?: number;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_tasks: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          description: string | null;
          status: "pending" | "in-progress" | "completed";
          priority: "low" | "medium" | "high" | "urgent";
          assigned_to: string | null;
          estimated_hours: number | null;
          actual_hours: number;
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          description?: string | null;
          status?: "pending" | "in-progress" | "completed";
          priority?: "low" | "medium" | "high" | "urgent";
          assigned_to?: string | null;
          estimated_hours?: number | null;
          actual_hours?: number;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          title?: string;
          description?: string | null;
          status?: "pending" | "in-progress" | "completed";
          priority?: "low" | "medium" | "high" | "urgent";
          assigned_to?: string | null;
          estimated_hours?: number | null;
          actual_hours?: number;
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_timeline: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          message: string;
          type: "comment" | "status_change" | "file_upload" | "task_update";
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          message: string;
          type?: "comment" | "status_change" | "file_upload" | "task_update";
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          user_id?: string;
          message?: string;
          type?: "comment" | "status_change" | "file_upload" | "task_update";
          created_at?: string;
        };
      };
      invoices: {
        Row: {
          id: string;
          invoice_number: string;
          design_request_id: string | null;
          user_id: string;
          designer_id: string | null;
          title: string;
          description: string | null;
          subtotal: number;
          tax_rate: number;
          tax_amount: number;
          discount_amount: number;
          total_amount: number;
          status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
          due_date: string | null;
          sent_at: string | null;
          paid_at: string | null;
          payment_method: "paypal" | "stripe" | "bank_transfer" | null;
          payment_reference: string | null;
          paypal_order_id: string | null;
          paypal_payer_id: string | null;
          notes: string | null;
          terms: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invoice_number?: string;
          design_request_id?: string | null;
          user_id: string;
          designer_id?: string | null;
          title: string;
          description?: string | null;
          subtotal?: number;
          tax_rate?: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount: number;
          status?: "draft" | "sent" | "paid" | "overdue" | "cancelled";
          due_date?: string | null;
          sent_at?: string | null;
          paid_at?: string | null;
          payment_method?: "paypal" | "stripe" | "bank_transfer" | null;
          payment_reference?: string | null;
          paypal_order_id?: string | null;
          paypal_payer_id?: string | null;
          notes?: string | null;
          terms?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invoice_number?: string;
          design_request_id?: string | null;
          user_id?: string;
          designer_id?: string | null;
          title?: string;
          description?: string | null;
          subtotal?: number;
          tax_rate?: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount?: number;
          status?: "draft" | "sent" | "paid" | "overdue" | "cancelled";
          due_date?: string | null;
          sent_at?: string | null;
          paid_at?: string | null;
          payment_method?: "paypal" | "stripe" | "bank_transfer" | null;
          payment_reference?: string | null;
          paypal_order_id?: string | null;
          paypal_payer_id?: string | null;
          notes?: string | null;
          terms?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      invoice_line_items: {
        Row: {
          id: string;
          invoice_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          item_type: "service" | "product" | "design" | "consultation";
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          description: string;
          quantity?: number;
          unit_price: number;
          total_price: number;
          item_type?: "service" | "product" | "design" | "consultation";
          created_at?: string;
        };
        Update: {
          id?: string;
          invoice_id?: string;
          description?: string;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
          item_type?: "service" | "product" | "design" | "consultation";
          created_at?: string;
        };
      };
      invoice_payments: {
        Row: {
          id: string;
          invoice_id: string;
          amount: number;
          payment_method: string;
          payment_reference: string | null;
          paypal_transaction_id: string | null;
          status: "pending" | "completed" | "failed" | "refunded";
          processed_at: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          amount: number;
          payment_method: string;
          payment_reference?: string | null;
          paypal_transaction_id?: string | null;
          status?: "pending" | "completed" | "failed" | "refunded";
          processed_at?: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          invoice_id?: string;
          amount?: number;
          payment_method?: string;
          payment_reference?: string | null;
          paypal_transaction_id?: string | null;
          status?: "pending" | "completed" | "failed" | "refunded";
          processed_at?: string;
          notes?: string | null;
        };
      };
      chats: {
        Row: {
          id: string;
          request_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          request_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          request_id?: string;
          created_at?: string;
        };
      };
      chat_participants: {
        Row: {
          id: string;
          chat_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          chat_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          chat_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          chat_id: string;
          sender_id: string;
          text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          chat_id: string;
          sender_id: string;
          text: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          chat_id?: string;
          sender_id?: string;
          text?: string;
          created_at?: string;
        };
      };
      simple_invoices: {
        Row: {
          id: string;
          request_id: string;
          amount: number;
          status: "pending" | "paid" | "overdue";
          due_date: string;
          created_at: string;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          request_id: string;
          amount: number;
          status?: "pending" | "paid" | "overdue";
          due_date: string;
          created_at?: string;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          request_id?: string;
          amount?: number;
          status?: "pending" | "paid" | "overdue";
          due_date?: string;
          created_at?: string;
          paid_at?: string | null;
        };
      };
      system_alerts: {
        Row: {
          id: string;
          type: "info" | "warning" | "error" | "success";
          title: string;
          message: string;
          is_read: boolean;
          action_url: string | null;
          source: "system" | "payment" | "user" | "project";
          created_at: string;
        };
        Insert: {
          id?: string;
          type: "info" | "warning" | "error" | "success";
          title: string;
          message: string;
          is_read?: boolean;
          action_url?: string | null;
          source: "system" | "payment" | "user" | "project";
          created_at?: string;
        };
        Update: {
          id?: string;
          type?: "info" | "warning" | "error" | "success";
          title?: string;
          message?: string;
          is_read?: boolean;
          action_url?: string | null;
          source?: "system" | "payment" | "user" | "project";
          created_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          resource: string;
          resource_id: string | null;
          details: Json;
          ip_address: string;
          user_agent: string;
          created_at: string;
          severity: "low" | "medium" | "high" | "critical";
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          resource: string;
          resource_id?: string | null;
          details: Json;
          ip_address: string;
          user_agent: string;
          created_at?: string;
          severity?: "low" | "medium" | "high" | "critical";
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          resource?: string;
          resource_id?: string | null;
          details?: Json;
          ip_address?: string;
          user_agent?: string;
          created_at?: string;
          severity?: "low" | "medium" | "high" | "critical";
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
          status: "new" | "read" | "replied" | "archived";
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          created_at?: string;
          status?: "new" | "read" | "replied" | "archived";
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
          status?: "new" | "read" | "replied" | "archived";
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
