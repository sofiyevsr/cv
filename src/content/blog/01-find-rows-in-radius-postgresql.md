---
published: true
title: How to return rows in given radius with PostgreSQL, PostGIS and DrizzleORM
author: Rasul Sofiyev
description: This post will guide you through unlocking the power of location-based search. Learn how to efficiently find entries within a specified radius using ST_DWithin from PostGIS and DrizzleORM in fully type-safe way.
image:
    url: ../assets/spatial-query-postgresql.jpg
    alt: Spatial Query PostGIS
pubDate: 2024-04-03
tags: ["postgresql", "postgis"]
---

## Table of content:

-   [Introduction](#introduction)
    -   [About geospatial data](#about-geospatial-data)
-   [Database schema](#database-schema)
-   [Queries](#queries)
    -   [Selecting](#selecting)
    -   [Filtering](#filtering)
    -   [Inserting](#inserting)
-   [Conclusion](#conclusion)

## Introduction

Location-based services have become increasingly important for various applications, ranging from social networking to logistics. Recently, I have been working on an application that requires finding users within radius from given point. We will be using PostgreSQL and PostGIS, a spatial database extender for PostgreSQL, stands out as a powerful tool. Using PostGIS can be straightforward but I have stumbled accross multiple issues while making it work with NodeJS and DrizzleORM without losing type-safety. Before getting started, I want to make a few notes about geospatial data, feel free to skip them if you don't care about details.

### About geospatial data

#### Difference between geography and geometry

There are 2 types of geospatial data in SQL we are interested in: geometry and geography. They are similar but one key difference is how they store and use data. To make a long story short, geometry uses 2D which makes calculations less accurate but faster, geography uses 3D which gives most accurate results with speed tradeoff. One other difference is how they return results from calculations, check these example:

```sql
SELECT ST_Distance(
  'SRID=4326;POINT(-118.4079 33.9434)'::geometry, -- Los Angeles (LAX)
  'SRID=4326;POINT(2.5559 49.0083)'::geometry     -- Paris (CDG)
);
-- 121.898285970107 in degrees
```

```sql
SELECT ST_Distance(
  'SRID=4326;POINT(-118.4079 33.9434)'::geography, -- Los Angeles (LAX)
  'SRID=4326;POINT(2.5559 49.0083)'::geography     -- Paris (CDG)
);
-- 9124665.27317673 in meters
```

So this means geometry makes calculations in degrees, while geography makes in meters which makes it useful for most of the use cases. You can read more from [here](http://postgis.net/workshops/postgis-intro/geography.html).

#### Difference between SRID of 3857 and 4326

There are 2 most common SRIDs (spatial reference identifier): 4326 (WGS84), 3857 (Web Mercator). 4326 is the most common used one and also default for PostGIS. To simply put differences together, 4326 is geographic coordinate system on earth map like 3D, 3857 is projected coordinate system on a flat map like 2D. We will be using 4326 as well. Let's head to the project setup.

### Database schema

> wkx dependency handles the process of parsing Point type from database

#### **`schema/index.ts`**

```typescript
import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { customType } from "drizzle-orm/pg-core";
import wkx from "wkx";

interface Point {
    longitude: number;
    latitude: number;
}

const point = customType<{
    data: Point;
    driverData: string;
}>({
    // Maps value to db type in insert queries
    toDriver(value) {
        return sql`ST_Point( ${value.longitude}, ${value.latitude}, 4326)`;
    },
    // Maps value from db type in select queries
    fromDriver(raw): Point {
        const buff = Buffer.from(raw, "hex");
        const { x, y } = wkx.Geometry.parse(buff) as unknown as {
            x: number;
            y: number;
        };
        return { longitude: x, latitude: y };
    },
    dataType() {
        return "geography(Point, 4326)";
    },
});

export const airport = pgTable("airport", {
    key: varchar("key", { length: 3 }).primaryKey(),
    location: point("location").notNull(),
    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`NOW()`),
});
```

I want to make few points on running migration with DrizzleORM. After running `pnpm drizzle-kit generate:mysql`, add following line to beginning of the migration file to enable PostGIS.

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

Other thing is the bug (maybe it is not) in DrizzleORM that it wraps geography type with ", which throws error when you run the migration. Currently, I haven't found anyway other that manually cleaning it up:

#### `FROM`

```sql
"location" "geography(Point, 4326)" NOT NULL,
```

#### `TO`

```sql
"location" geography(Point, 4326) NOT NULL,
```

## Queries

### Selecting

Getting location data is straightforward as mapping function above named 'fromDriver' handles parsing point data in the shape you expected.

```typescript
const airports = await db.select({ location: airport.location }).from(airport);
// airports is of type {location: { longitude: number, latitude: number }}[]
```

### Filtering

Unfortunately, filtering is the only place we have to write some SQL. You probably have to write reusable function for this clause as it might not be cleanest to write SQL everywhere. Anyways, we will be using ST_DWithin to check if the row is in given radius. Read more about it [here](https://postgis.net/docs/ST_DWithin.html).

```typescript
// Radius to search airports in meters
const searchRadius = 5000;
const input = { latitude: 40, longitude: 40 };
const airports = await db
    .select()
    .from(airport)
    .where(
        sql`ST_DWithin(${sql`ST_Point( ${input.longitude}, ${input.latitude}, 4326)`}, ${
            airport.location
        }, ${searchRadius})`
    );
// airports is of type {location: { longitude: number, latitude: number }, ...rest}[]
```

### Inserting

Getting location data is also straightforward. You just need to insert value as latitude, longitude object as it will processed by 'toDriver' function above.

```typescript
await db
    .insert(airport)
    .values({ key: "LAX", location: { latitude: 40, longitude: 40 } });
```

## Conclusion

I believe, this is not perfect solution as there are manual work and workarounds are included, it is enough for me to avoid writing manual SQL. Combining PostGIS and DrizzleORM simplifies the task of working with location data without losing type-safety. Now that you can efficiently find entries within a specified radius, you're equipped to solve exciting location-based problems in your applications.
