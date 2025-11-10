const { PrismaClient } = require('./app/generated/prisma');

const prisma = new PrismaClient();

async function showBookmarks() {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('\n=== Bookmarks ===\n');
    
    if (bookmarks.length === 0) {
      console.log('No bookmarks found in the database.\n');
    } else {
      bookmarks.forEach((bookmark, index) => {
        console.log(`${index + 1}. ${bookmark.title}`);
        console.log(`   URL: ${bookmark.url}`);
        if (bookmark.notes) {
          console.log(`   Notes: ${bookmark.notes}`);
        }
        console.log(`   User ID: ${bookmark.userId}`);
        console.log(`   Created: ${bookmark.createdAt}`);
        console.log(`   Updated: ${bookmark.updatedAt}`);
        console.log('');
      });
      console.log(`Total: ${bookmarks.length} bookmark(s)\n`);
    }
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
  } finally {
    await prisma.$disconnect();
  }
}

showBookmarks();

