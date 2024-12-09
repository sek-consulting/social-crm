import type { ColumnDef } from "@tanstack/solid-table"

export type Client = {
  id: string

  // Base details
  name: string
  email: string
  phoneNumber?: string
  dateOfBirth?: Date
  address?: string

  // Professional details
  role?: string // profession/role like model, band member
  tags?: string[] // skills or attributes for filtering

  // Social media handles
  instagram?: string
  facebook?: string
  twitter?: string
  youtube?: string
  tiktok?: string
  linkedIn?: string

  // CRM-specific
  notes?: string
  lastContacted?: Date
  status: "Active" | "Prospect" | "Inactive"
  preferredContactMethod?: "Email" | "Phone" | "Social Media"

  // createdAt
  // updatedAt
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "status",
    header: "Status"
  }
]
