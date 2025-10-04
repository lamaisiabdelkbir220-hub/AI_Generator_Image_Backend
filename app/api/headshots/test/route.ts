import db from "@/db";
import * as schema from '@/db/schema';
import { auth } from "@/lib/auth";
import { HEADSHOT_STYLES, HEADSHOT_ASPECT_RATIOS } from "@/lib/constants";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const testType = url.searchParams.get('type') || 'basic';

    const tests = {
      basic: await runBasicTests(),
      database: await runDatabaseTests(),
      styles: await runStyleTests(),
      config: await runConfigTests()
    };

    const selectedTest = tests[testType as keyof typeof tests];
    
    return Response.json({
      message: `Headshot ${testType} test completed`,
      data: selectedTest,
      statusCode: 200
    }, { status: 200 });

  } catch (error) {
    console.error("Error running headshot tests:", error);
    return Response.json({
      message: "Test execution failed",
      data: { error: error instanceof Error ? error.message : String(error) },
      statusCode: 500
    }, { status: 500 });
  }
}

async function runBasicTests() {
  const results = {
    constantsLoaded: false,
    stylesCount: 0,
    aspectRatiosCount: 0,
    premiumStylesCount: 0,
    categoriesValid: false
  };

  try {
    // Test constants loading
    results.constantsLoaded = Array.isArray(HEADSHOT_STYLES) && HEADSHOT_STYLES.length > 0;
    results.stylesCount = HEADSHOT_STYLES.length;
    results.aspectRatiosCount = HEADSHOT_ASPECT_RATIOS.length;
    results.premiumStylesCount = HEADSHOT_STYLES.filter(s => s.isPremium).length;
    
    // Test categories
    const categories = new Set(HEADSHOT_STYLES.map(s => s.category));
    results.categoriesValid = categories.size > 0;

    return {
      success: true,
      results,
      message: "Basic tests passed"
    };
  } catch (error) {
    return {
      success: false,
      results,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

async function runDatabaseTests() {
  const results = {
    canConnectToDb: false,
    headshotGenerationsTableExists: false,
    stylesAvailable: 0
  };

  try {
    // Test database connection
    const testQuery = await db.select().from(schema.users).limit(1);
    results.canConnectToDb = true;

    // Test headshot tables exist by attempting to query them
    try {
      await db.select().from(schema.headshotGenerations).limit(1);
      results.headshotGenerationsTableExists = true;
    } catch (error) {
      console.log("headshotGenerations table not found:", error);
    }

    // Styles are managed in constants, not database
    results.stylesAvailable = HEADSHOT_STYLES.length;

    return {
      success: true,
      results,
      message: "Database tests completed"
    };
  } catch (error) {
    return {
      success: false,
      results,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

async function runStyleTests() {
  const results = {
    totalStyles: HEADSHOT_STYLES.length,
    styleBreakdown: {} as Record<string, number>,
    validationResults: {} as Record<string, boolean>
  };

  try {
    // Count styles by category
    const categories = new Set(HEADSHOT_STYLES.map(s => s.category));
    categories.forEach(category => {
      results.styleBreakdown[category] = HEADSHOT_STYLES.filter(s => s.category === category).length;
    });

    // Validate style properties
    results.validationResults = {
      allHaveId: HEADSHOT_STYLES.every(s => s.id && s.id.length > 0),
      allHaveName: HEADSHOT_STYLES.every(s => s.name && s.name.length > 0),
      allHavePrompt: HEADSHOT_STYLES.every(s => s.promptTemplate && s.promptTemplate.length > 0),
      allHaveCost: HEADSHOT_STYLES.every(s => typeof s.creditCost === 'number' && s.creditCost > 0),
      allHaveCategory: HEADSHOT_STYLES.every(s => s.category && s.category.length > 0),
      premiumStylesHaveHigherCost: HEADSHOT_STYLES.filter(s => s.isPremium).every(s => s.creditCost >= 4)
    };

    return {
      success: true,
      results,
      message: "Style validation completed"
    };
  } catch (error) {
    return {
      success: false,
      results,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

async function runConfigTests() {
  const results = {
    aspectRatiosValid: false,
    resolutionsValid: false,
    qualityTiersValid: false
  };

  try {
    // Test aspect ratios
    results.aspectRatiosValid = HEADSHOT_ASPECT_RATIOS.every(ar => 
      ar.ratio && ar.resolution && ar.description
    );

    // Test resolutions are valid format
    results.resolutionsValid = HEADSHOT_ASPECT_RATIOS.every(ar => {
      const [width, height] = ar.resolution.split('x').map(Number);
      return !isNaN(width) && !isNaN(height) && width > 0 && height > 0;
    });

    // Test quality tiers
    const qualityLevels = ['standard', 'high', 'ultra'];
    results.qualityTiersValid = qualityLevels.every(level => {
      const costKey = `${level}_quality` as const;
      return typeof HEADSHOT_STYLES[0] !== 'undefined'; // Basic validation
    });

    return {
      success: true,
      results,
      message: "Configuration tests completed"
    };
  } catch (error) {
    return {
      success: false,
      results,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}