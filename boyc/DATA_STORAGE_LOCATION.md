# BOYC Data Storage Location

## 📍 Physical Storage Location

Your drama reviews and user data are stored on your hard drive at:

```
C:\Program Files\MongoDB\Server\8.0\data
```

## 📂 Database Structure

```
C:\Program Files\MongoDB\Server\8.0\data\
├── collection-*.wt          ← Your actual data files (WiredTiger format)
├── index-*.wt               ← Database indexes for fast queries
├── journal\                 ← Transaction logs for crash recovery
├── _mdb_catalog.wt          ← Database catalog
├── WiredTiger.wt            ← Main WiredTiger metadata
└── mongod.lock              ← Lock file (MongoDB is running)
```

## 🗄️ Your Database

**Database Name:** `boyc-movie-diary`

**Collections (Tables):**
1. `users` - User accounts
   - username
   - email
   - password (hashed)
   - primaryColor
   - secondaryColor

2. `reviews` - Drama reviews
   - name (drama name)
   - imageUrl
   - genre
   - dramaOrigin
   - numberOfEP
   - description
   - yourPOV
   - rating
   - userId (reference to user)
   - timestamp

## 🔍 How to View Your Data

### Method 1: MongoDB Compass (GUI - Recommended)

1. **Download MongoDB Compass:**
   - Visit: https://www.mongodb.com/try/download/compass
   - Install the application

2. **Connect:**
   - Open MongoDB Compass
   - Connection string: `mongodb://localhost:27017`
   - Click "Connect"

3. **Browse Your Data:**
   - Click on database: `boyc-movie-diary`
   - Click on collection: `reviews` or `users`
   - View all your drama reviews!

### Method 2: MongoDB Shell (CLI)

```bash
# Open MongoDB Shell
mongosh

# Switch to your database
use boyc-movie-diary

# View all drama reviews
db.reviews.find().pretty()

# View all users
db.users.find().pretty()

# Count reviews
db.reviews.countDocuments()

# Find specific drama
db.reviews.find({ name: "Drama Name" })

# Exit
exit
```

### Method 3: Windows File Explorer

1. Open File Explorer
2. Navigate to: `C:\Program Files\MongoDB\Server\8.0\data`
3. You'll see `.wt` files (WiredTiger format)
4. These are binary files - use MongoDB Compass or Shell to read them

## 💾 Data Persistence

Your data is stored in **WiredTiger** format, which means:

✅ **Permanent storage** - Data written to disk, not RAM  
✅ **Survives restarts** - Computer, MongoDB, or browser restarts  
✅ **ACID compliant** - Atomic, Consistent, Isolated, Durable  
✅ **Crash recovery** - Journal logs protect against data loss  
✅ **Compression** - Efficient disk space usage  

## 🔒 Data Security

- Passwords are hashed with bcryptjs (not stored in plain text)
- Each user can only access their own reviews
- JWT tokens expire after 7 days
- Data is stored locally on your machine

## 📊 Check Database Size

```bash
# In MongoDB Shell
use boyc-movie-diary
db.stats()
```

This will show:
- Database size
- Number of collections
- Number of documents
- Storage size
- Index size

## 🗑️ Data Deletion

Your data is ONLY deleted when:
1. You click "Delete Review" button in the app
2. You manually delete from MongoDB
3. You drop the database: `db.dropDatabase()`
4. You uninstall MongoDB and delete data folder

## 🔄 Backup Your Data

To backup your drama reviews:

```bash
# Export to JSON
mongodump --db boyc-movie-diary --out C:\backup\

# Restore from backup
mongorestore --db boyc-movie-diary C:\backup\boyc-movie-diary\
```

## 📈 Monitor Your Data

Check if MongoDB is running:
```bash
mongosh --eval "db.adminCommand('ping')"
```

Check your reviews count:
```bash
mongosh --eval "use boyc-movie-diary; db.reviews.countDocuments()"
```

---

**Your data is safe and permanent!** 🎉

All drama reviews you add will be stored in MongoDB on your hard drive and will persist forever until you explicitly delete them.
