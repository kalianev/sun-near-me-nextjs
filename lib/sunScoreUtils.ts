export interface SunScoreMetrics {
  uvIndex: number;
  cloudCoverage: number;
  sunPosition: number;
  temperature: number;
  outdoorActivities: number;
  accessibility: number;
  seasonality: number;
  venueFeatures: string[];
}

export interface SunScoreResult {
  totalScore: number;
  breakdown: {
    uvScore: number;
    cloudScore: number;
    sunPositionScore: number;
    temperatureScore: number;
    outdoorScore: number;
    accessibilityScore: number;
    seasonalityScore: number;
    featureScore: number;
  };
  comparison?: {
    percentBetterThan: number;
    reasonsWhy: string[];
  };
}

export const calculateDetailedSunScore = (metrics: SunScoreMetrics): SunScoreResult => {
  const breakdown = {
    uvScore: calculateUVScore(metrics.uvIndex),
    cloudScore: calculateCloudScore(metrics.cloudCoverage),
    sunPositionScore: calculateSunPositionScore(metrics.sunPosition),
    temperatureScore: calculateTemperatureScore(metrics.temperature),
    outdoorScore: calculateOutdoorScore(metrics.outdoorActivities),
    accessibilityScore: calculateAccessibilityScore(metrics.accessibility),
    seasonalityScore: calculateSeasonalityScore(metrics.seasonality),
    featureScore: calculateFeatureScore(metrics.venueFeatures)
  };

  const totalScore = Object.values(breakdown).reduce((sum, score) => sum + score, 0);

  return {
    totalScore: Math.round(totalScore),
    breakdown
  };
};

const calculateUVScore = (uvIndex: number): number => {
  // UV Index (0-15) contributes up to 20 points
  // Optimal UV range is 3-7 for outdoor activities
  if (uvIndex >= 3 && uvIndex <= 7) return 20;
  if (uvIndex < 3) return (uvIndex / 3) * 20;
  return Math.max(0, 20 - ((uvIndex - 7) * 2));
};

const calculateCloudScore = (cloudCoverage: number): number => {
  // Cloud coverage (0-100%) contributes up to 15 points
  // Lower is better, but some clouds can be pleasant
  return Math.max(0, 15 - (cloudCoverage / 100 * 15));
};

const calculateSunPositionScore = (sunPosition: number): number => {
  // Sun position (0-90°) contributes up to 15 points
  // Higher angles generally mean better lighting
  return (sunPosition / 90) * 15;
};

const calculateTemperatureScore = (temperature: number): number => {
  // Temperature (°F) contributes up to 15 points
  // Optimal range is 68-78°F
  const optimal = temperature >= 68 && temperature <= 78;
  const nearOptimal = temperature >= 60 && temperature <= 85;
  
  if (optimal) return 15;
  if (nearOptimal) return 10;
  return Math.max(0, 15 - Math.abs(temperature - 73) / 2);
};

const calculateOutdoorScore = (activities: number): number => {
  // Number of outdoor activities contributes up to 10 points
  return Math.min(10, activities);
};

const calculateAccessibilityScore = (accessibility: number): number => {
  // Accessibility (0-10) contributes up to 10 points
  return Math.min(10, accessibility);
};

const calculateSeasonalityScore = (seasonality: number): number => {
  // Seasonality (0-10) contributes up to 5 points
  return Math.min(5, seasonality);
};

const calculateFeatureScore = (features: string[]): number => {
  // Venue features contribute up to 10 points
  const featurePoints: { [key: string]: number } = {
    outdoor_seating: 2,
    rooftop: 2.5,
    skylight: 1.5,
    floor_to_ceiling_windows: 2,
    south_facing: 2,
    west_facing: 1.5,
    shade_available: 1,
    waterfront: 2,
    hiking_trails: 2,
    scenic_views: 1.5,
    beach_access: 2
  };

  const score = features.reduce((sum, feature) => 
    sum + (featurePoints[feature] || 0), 0);
  
  return Math.min(10, score);
};

export const compareLocations = (
  mainLocation: SunScoreResult,
  otherLocations: SunScoreResult[]
): SunScoreResult => {
  const allScores = [mainLocation.totalScore, ...otherLocations.map(l => l.totalScore)];
  const maxScore = Math.max(...allScores);
  
  if (mainLocation.totalScore === maxScore) {
    const avgOtherScores = otherLocations.reduce((sum, loc) => 
      sum + loc.totalScore, 0) / otherLocations.length;
    
    const percentBetter = ((mainLocation.totalScore - avgOtherScores) / avgOtherScores) * 100;
    
    const reasonsWhy = [];
    if (mainLocation.breakdown.uvScore > avgOtherScores) {
      reasonsWhy.push('Better UV conditions for outdoor activities');
    }
    if (mainLocation.breakdown.temperatureScore > avgOtherScores) {
      reasonsWhy.push('More comfortable temperature range');
    }
    if (mainLocation.breakdown.outdoorScore > avgOtherScores) {
      reasonsWhy.push('More outdoor activities available');
    }
    
    return {
      ...mainLocation,
      comparison: {
        percentBetterThan: Math.round(percentBetter),
        reasonsWhy
      }
    };
  }
  
  return mainLocation;
};

export const getSunScoreCategory = (score: number): 'low' | 'medium' | 'high' => {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
};

export const getSunScoreLabel = (score: number): string => {
  if (score >= 90) return 'Exceptional Sunlight & Activities';
  if (score >= 80) return 'Outstanding Destination';
  if (score >= 70) return 'Excellent Choice';
  if (score >= 60) return 'Very Good Option';
  if (score >= 50) return 'Good Experience';
  if (score >= 40) return 'Fair Choice';
  if (score >= 30) return 'Moderate Appeal';
  if (score >= 20) return 'Limited Appeal';
  if (score >= 10) return 'Poor Conditions';
  return 'Not Recommended';
};

// Helper function to get color based on sun score
export const getSunScoreColor = (score: number): string => {
  if (score >= 90) return 'text-emerald-500';
  if (score >= 80) return 'text-green-500';
  if (score >= 70) return 'text-lime-500';
  if (score >= 60) return 'text-yellow-500';
  if (score >= 50) return 'text-amber-500';
  if (score >= 40) return 'text-orange-500';
  if (score >= 30) return 'text-orange-600';
  if (score >= 20) return 'text-red-500';
  if (score >= 10) return 'text-red-600';
  return 'text-red-700';
};

// Helper function to get background color based on sun score
export const getSunScoreBgColor = (score: number): string => {
  if (score >= 90) return 'bg-emerald-500/20';
  if (score >= 80) return 'bg-green-500/20';
  if (score >= 70) return 'bg-lime-500/20';
  if (score >= 60) return 'bg-yellow-500/20';
  if (score >= 50) return 'bg-amber-500/20';
  if (score >= 40) return 'bg-orange-500/20';
  if (score >= 30) return 'bg-orange-600/20';
  if (score >= 20) return 'bg-red-500/20';
  if (score >= 10) return 'bg-red-600/20';
  return 'bg-red-700/20';
};

// Helper function to get icon based on sun score
export const getSunScoreIcon = (score: number): string => {
  if (score >= 90) return '🌞';
  if (score >= 80) return '☀️';
  if (score >= 70) return '🌤️';
  if (score >= 60) return '⛅';
  if (score >= 50) return '🌥️';
  if (score >= 40) return '☁️';
  if (score >= 30) return '🌦️';
  if (score >= 20) return '🌧️';
  if (score >= 10) return '⛈️';
  return '🌩️';
}; 