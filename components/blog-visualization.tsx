"use client"

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface BlogVisualizationProps {
  type: string
  data?: any
}

export function BlogVisualization({ type, data }: BlogVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 800
    const height = 400
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])

    // Create different visualizations based on blog type
    switch (type) {
      case "heliocentric-architecture-through-history":
        createArchitectureVisualization(svg, width, height, margin)
        break
      case "music-for-sunrise-rituals":
        createMusicVisualization(svg, width, height, margin)
        break
      case "circadian-rhythms":
        createCircadianVisualization(svg, width, height, margin)
        break
      case "agricultural-practices":
        createAgriculturalVisualization(svg, width, height, margin)
        break
      case "visual-art":
        createArtVisualization(svg, width, height, margin)
        break
      case "somatic-practices":
        createSomaticVisualization(svg, width, height, margin)
        break
      default:
        createDefaultVisualization(svg, width, height, margin)
    }
  }, [type, data])

  return (
    <div className="w-full overflow-hidden rounded-lg bg-black/5 p-4">
      <svg ref={svgRef} className="w-full"></svg>
    </div>
  )
}

function createArchitectureVisualization(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number }
) {
  const data = [
    { year: -300, name: 'Ancient Egypt', description: 'Pyramids aligned with stars' },
    { year: -200, name: 'Greek Temples', description: 'Oriented to sunrise' },
    { year: 0, name: 'Roman Architecture', description: 'Solar orientation in cities' },
    { year: 1200, name: 'Gothic Cathedrals', description: 'Stained glass and light' },
    { year: 1600, name: 'Renaissance', description: 'Geometric solar patterns' },
    { year: 1900, name: 'Modern', description: 'Sustainable solar design' },
  ]

  const x = d3
    .scaleLinear()
    .domain([-300, 1900])
    .range([margin.left, width - margin.right])

  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])

  const arc = d3
    .arc<d3.PieArcDatum<typeof data[0]>>()
    .innerRadius(100)
    .outerRadius(150)
    .padAngle(0.02)

  const pie = d3.pie<typeof data[0]>().value(() => 1)

  const arcs = pie(data)

  const g = svg
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)

  g.selectAll('path')
    .data(arcs)
    .join('path')
    .attr('d', arc)
    .attr('fill', (d, i) => d3.schemeCategory10[i])
    .attr('stroke', 'white')
    .style('stroke-width', '2px')
    .style('opacity', 0.7)
    .on('mouseover', function (event, d) {
      d3.select(this).style('opacity', 1)
    })
    .on('mouseout', function () {
      d3.select(this).style('opacity', 0.7)
    })

  g.selectAll('text')
    .data(arcs)
    .join('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text((d) => d.data.name)
    .style('font-size', '12px')
    .style('fill', 'white')
}

function createMusicVisualization(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number }
) {
  const data = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    intensity: Math.sin((i / 24) * Math.PI * 2) * 50 + 50,
  }))

  const x = d3
    .scaleLinear()
    .domain([0, 23])
    .range([margin.left, width - margin.right])

  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])

  const line = d3
    .line<typeof data[0]>()
    .x((d) => x(d.hour))
    .y((d) => y(d.intensity))
    .curve(d3.curveBasis)

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#ffd700')
    .attr('stroke-width', 3)
    .attr('d', line)

  svg
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => x(d.hour))
    .attr('cy', (d) => y(d.intensity))
    .attr('r', 4)
    .attr('fill', '#ffd700')
    .on('mouseover', function (event, d) {
      d3.select(this).attr('r', 6)
    })
    .on('mouseout', function () {
      d3.select(this).attr('r', 4)
    })
}

function createCircadianVisualization(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number }
) {
  const data = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    activity: Math.sin((i / 24) * Math.PI * 2) * 50 + 50,
    temperature: Math.cos((i / 24) * Math.PI * 2) * 2 + 37,
  }))

  const x = d3
    .scaleLinear()
    .domain([0, 23])
    .range([margin.left, width - margin.right])

  const y1 = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])

  const y2 = d3
    .scaleLinear()
    .domain([35, 39])
    .range([height - margin.bottom, margin.top])

  const line1 = d3
    .line<typeof data[0]>()
    .x((d) => x(d.hour))
    .y((d) => y1(d.activity))
    .curve(d3.curveBasis)

  const line2 = d3
    .line<typeof data[0]>()
    .x((d) => x(d.hour))
    .y((d) => y2(d.temperature))
    .curve(d3.curveBasis)

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#ffd700')
    .attr('stroke-width', 2)
    .attr('d', line1)

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#ff6b6b')
    .attr('stroke-width', 2)
    .attr('d', line2)
}

function createAgriculturalVisualization(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number }
) {
  const data = [
    { month: 0, growth: 0, harvest: 0 },
    { month: 1, growth: 10, harvest: 0 },
    { month: 2, growth: 30, harvest: 0 },
    { month: 3, growth: 60, harvest: 0 },
    { month: 4, growth: 90, harvest: 0 },
    { month: 5, growth: 100, harvest: 20 },
    { month: 6, growth: 90, harvest: 40 },
    { month: 7, growth: 70, harvest: 60 },
    { month: 8, growth: 40, harvest: 80 },
    { month: 9, growth: 20, harvest: 100 },
    { month: 10, growth: 10, harvest: 80 },
    { month: 11, growth: 0, harvest: 40 },
  ]

  const x = d3
    .scaleLinear()
    .domain([0, 11])
    .range([margin.left, width - margin.right])

  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])

  const area = d3
    .area<typeof data[0]>()
    .x((d) => x(d.month))
    .y0((d) => y(d.growth))
    .y1((d) => y(d.harvest))
    .curve(d3.curveBasis)

  svg
    .append('path')
    .datum(data)
    .attr('fill', '#90EE90')
    .attr('opacity', 0.5)
    .attr('d', area)
}

function createArtVisualization(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number }
) {
  const data = Array.from({ length: 100 }, () => ({
    x: Math.random() * (width - margin.left - margin.right) + margin.left,
    y: Math.random() * (height - margin.top - margin.bottom) + margin.top,
    size: Math.random() * 20 + 5,
    color: d3.interpolateRdYlBu(Math.random()),
  }))

  svg
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', (d) => d.size)
    .attr('fill', (d) => d.color)
    .attr('opacity', 0.7)
    .on('mouseover', function () {
      d3.select(this).attr('opacity', 1)
    })
    .on('mouseout', function () {
      d3.select(this).attr('opacity', 0.7)
    })
}

function createSomaticVisualization(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number }
) {
  const data = Array.from({ length: 50 }, (_, i) => ({
    angle: (i / 50) * Math.PI * 2,
    radius: 100 + Math.random() * 50,
  }))

  const x = d3
    .scaleLinear()
    .domain([-1, 1])
    .range([margin.left, width - margin.right])

  const y = d3
    .scaleLinear()
    .domain([-1, 1])
    .range([height - margin.bottom, margin.top])

  const line = d3
    .line<typeof data[0]>()
    .x((d) => x(Math.cos(d.angle) * (d.radius / 150)))
    .y((d) => y(Math.sin(d.angle) * (d.radius / 150)))
    .curve(d3.curveBasisClosed)

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#ffd700')
    .attr('stroke-width', 2)
    .attr('d', line)
}

function createDefaultVisualization(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number }
) {
  const data = Array.from({ length: 20 }, (_, i) => ({
    x: (i / 19) * (width - margin.left - margin.right) + margin.left,
    y: Math.random() * (height - margin.top - margin.bottom) + margin.top,
  }))

  const line = d3
    .line<typeof data[0]>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(d3.curveBasis)

  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#ffd700')
    .attr('stroke-width', 2)
    .attr('d', line)
} 