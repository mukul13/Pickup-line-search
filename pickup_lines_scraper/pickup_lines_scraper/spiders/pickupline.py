# -*- coding: utf-8 -*-
import scrapy
from pickup_lines_scraper.items import PickupLinesScraperItem

class PickuplineSpider(scrapy.Spider):
    name = 'pickupline'
    def start_requests(self):
        urls = [
        	'https://pickupline.net/'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
    	#post-19 a -> css selector
    	post_links = response.css('#post-19 a').xpath('@href').getall()
        for link in post_links:
        	yield scrapy.Request(link, callback = self.parse_dir_contents)

    def parse_dir_contents(self, response):
    	# .row-hover .column-1 -> css selector
    	jokes = response.xpath('//*[contains(concat( " ", @class, " " ), concat( " ", "row-hover", " " ))]//*[contains(concat( " ", @class, " " ), concat( " ", "column-1", " " ))]//text()').getall()
    	for joke in jokes:
            joke=str(joke.encode('ascii', 'ignore'))
            yield PickupLinesScraperItem(content=joke)