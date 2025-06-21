# Salesforce CDC Listener - LWC Component

This project contains a **Lightning Web Component (LWC)** designed to listen to events raised in the Salesforce org.

## 🔍 Overview

This component helps monitor platform events in real-time, and is currently focused on **Change Data Capture (CDC)** events. It simplifies the process of testing and debugging CDC behavior for key standard objects.

## ⚙️ Features

- Listens to **Change Data Capture** (CDC) events via EMP API.
- Displays real-time changes made to supported objects.
- Helps validate and troubleshoot CDC configuration quickly.

## 📌 Current Supported Objects

- `Account`
- `Contact`
- `Case`

These objects must be explicitly **added under Change Data Capture** in **Setup → Change Data Capture** in your Salesforce org.

## 🧾 Requirements

To use this component effectively:

1. **Object Access**
   - The user must have **Read** access to the `Account`, `Contact`, and `Case` objects.

2. **API Access**
   - The user must have the **API Enabled** permission.
   - Recommended: Assign via **Permission Set**, but adding it directly on the Profile also works.

## 🧩 Usage

- Best placed on the **Home Page** to monitor org-wide changes in a central location.
- Can also be added to the **record page** of Account, Contact, or Case for object-specific monitoring.

## 🚀 Deployment

1. Clone or copy the component into your Salesforce DX project.
2. Deploy it to your org using the Salesforce CLI:
   ```bash
   sfdx force:source:deploy -p force-app/main/default/lwc/eventListener

## 🔐 License

This project is licensed under the [BSD 3-Clause License](LICENSE).  
© 2025 Sudhir Kumar Panda