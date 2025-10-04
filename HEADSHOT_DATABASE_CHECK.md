# 🔍 How to Check if Headshot Database is Already Set Up

## Quick Database Check

### Option 1: Use the Test Endpoint (Easiest)
```bash
GET /api/headshots/test?type=database
```

**Expected Response if setup:**
```json
{
  "success": true,
  "results": {
    "canConnectToDb": true,
    "headshotGenerationsTableExists": true,
    "stylesAvailable": 9
  },
  "message": "Database tests completed"
}
```

### Option 2: Direct SQL Query
Run this in your PostgreSQL database:

```sql
-- Check if headshot_generations table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_name = 'headshot_generations'
);

-- Check table structure
\d headshot_generations

-- Count any existing headshot records
SELECT COUNT(*) FROM headshot_generations;
```

### Option 3: Check for Enums
```sql
-- Check if headshot enums exist
SELECT EXISTS (
   SELECT FROM pg_type 
   WHERE typname = 'headshot_status_enum'
);

SELECT EXISTS (
   SELECT FROM pg_type 
   WHERE typname = 'headshot_quality_enum'
);
```

---

## What Tables Should Exist?

After running `headshot-database-setup.sql`, you should have:

### ✅ Tables Created:
- `headshot_generations` - Stores headshot generation requests and results

### ✅ Enums Created:
- `headshot_status_enum` - ['queued', 'processing', 'completed', 'failed']
- `headshot_quality_enum` - ['standard', 'high', 'ultra']

### ✅ Indexes Created:
- `idx_headshot_generations_user_id`
- `idx_headshot_generations_status`
- `idx_headshot_generations_created_at`

### ❌ NOT Created (Styles managed in code):
- ~~`headshot_styles` table~~ - **Removed** (styles are in `lib/constants.ts`)

---

## Running the Setup Script

### If Database NOT Set Up:
```bash
# Connect to your database
psql -U your_username -d your_database

# Run the setup script
\i scripts/headshot-database-setup.sql

# You should see:
# "Headshot database setup completed successfully!"
```

### If Already Set Up:
The script uses `CREATE TABLE IF NOT EXISTS`, so it's **safe to run multiple times**.

---

## Common Issues

### Error: "table already exists"
✅ **Safe to ignore** - Database is already set up

### Error: "type already exists"
✅ **Safe to ignore** - Enums are already created

### Error: "relation does not exist"
❌ **Need to run setup** - Tables not created yet

---

## Verification Checklist

- [ ] `headshot_generations` table exists
- [ ] `headshot_status_enum` type exists
- [ ] `headshot_quality_enum` type exists
- [ ] Indexes are created
- [ ] Test endpoint returns `headshotGenerationsTableExists: true`
- [ ] 9 styles available in `/api/headshots/config`

**All checked?** ✅ Your database is ready!