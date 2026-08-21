import api from "../api/axios";

const dashboardService = {

  // Dashboard Overview
  getStats() {
    return api.get("/dashboard/stats");
  },

  // AI Insights
  getAIInsights() {
    return api.get("/dashboard/ai/insights");
  },

  // Recent Employees
  getRecentEmployees() {
    return api.get("/employees/recent");
  },

  // Recent Activities
  getActivities() {
    return api.get("/dashboard/activities");
  },

  // Attendance Summary
  getAttendanceSummary() {
    return api.get("/attendance/summary");
  },

  // Pending Approvals
  getPendingApprovals() {
    return api.get("/approvals/pending");
  },

  // Announcements
  getAnnouncements() {
    return api.get("/dashboard/announcements");
  },

  // System Health
  getSystemHealth() {
    return api.get("/system/health");
  },

  // Performance Metrics
  getPerformanceMetrics() {
    return api.get("/dashboard/performance");
  },

  // Department Summary
  getDepartmentSummary() {
    return api.get("/departments/summary");
  },

  // Upcoming Events
  getEvents() {
    return api.get("/events/upcoming");
  },

  // Holidays
  getHolidays() {
    return api.get("/holidays");
  },

  // Birthdays
  getBirthdays() {
    return api.get("/employees/birthdays");
  },

  // New Joiners
  getNewJoiners() {
    return api.get("/employees/new-joiners");
  },

  // Security Logs
  getSecurityLogs() {
    return api.get("/security/logs");
  }

};

export default dashboardService;