/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardQuery
// ====================================================

export interface DashboardQuery_dashboard_draft {
  __typename: "DashboardItem";
  count: number;
  amount: any;
}

export interface DashboardQuery_dashboard_open {
  __typename: "DashboardItem";
  count: number;
  amount: any;
}

export interface DashboardQuery_dashboard_paidOut {
  __typename: "DashboardItem";
  count: number;
  amount: any;
}

export interface DashboardQuery_dashboard_expired {
  __typename: "DashboardItem";
  count: number;
  amount: any;
}

export interface DashboardQuery_dashboard {
  __typename: "Dashboard";
  draft: DashboardQuery_dashboard_draft | null;
  open: DashboardQuery_dashboard_open | null;
  paidOut: DashboardQuery_dashboard_paidOut | null;
  expired: DashboardQuery_dashboard_expired | null;
}

export interface DashboardQuery {
  dashboard: DashboardQuery_dashboard | null;
}
