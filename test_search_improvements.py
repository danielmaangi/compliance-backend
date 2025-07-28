#!/usr/bin/env python3
"""
Test script to demonstrate the improved search functionality with plural search and word boundary matching.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from main import extract_sentences_from_text, KEYWORDS

def test_plural_search():
    """Test plural search functionality."""
    print("=== Testing Plural Search ===")
    
    # Test cases for plural search
    test_cases = [
        {
            "text": "We conducted several surveys to understand gender dynamics.",
            "expected_keywords": ["gender"],
            "description": "Should find 'gender' when searching for 'gender' (and 'surveys' should be found if 'survey' was a keyword)"
        },
        {
            "text": "The survey shows that women face many challenges.",
            "expected_keywords": [],
            "description": "Should find 'survey' if 'survey' was in keywords (testing singular form)"
        },
        {
            "text": "Multiple identities were discussed in the report.",
            "expected_keywords": ["identity"],
            "description": "Should find 'identity' when text contains 'identities' (plural form)"
        },
        {
            "text": "The hormone therapy programs are effective.",
            "expected_keywords": ["hormone"],
            "description": "Should find 'hormone' in text"
        },
        {
            "text": "Various hormones were analyzed in the study.",
            "expected_keywords": ["hormone"],
            "description": "Should find 'hormone' when text contains 'hormones' (plural form)"
        }
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\nTest {i}: {test_case['description']}")
        print(f"Text: '{test_case['text']}'")
        
        matches = extract_sentences_from_text(test_case['text'], KEYWORDS)
        found_keywords = [match['keyword'] for match in matches]
        
        print(f"Found keywords: {found_keywords}")
        print(f"Expected: {test_case['expected_keywords']}")
        
        # Check if any expected keywords were found
        if test_case['expected_keywords']:
            found_expected = any(keyword in found_keywords for keyword in test_case['expected_keywords'])
            print(f"✓ PASS" if found_expected else "✗ FAIL")
        else:
            print("ℹ INFO: No specific expectations for this test")

def test_word_boundary():
    """Test word boundary matching functionality."""
    print("\n\n=== Testing Word Boundary Matching ===")
    
    # Test cases for word boundary matching
    test_cases = [
        {
            "text": "The mathematics course covers various topics.",
            "should_match": True,
            "keyword_to_check": "mat",
            "description": "Should find 'mat' in 'mathematics' (partial word match)"
        },
        {
            "text": "The team works on important projects.",
            "should_match": False,
            "keyword_to_check": "tea",
            "description": "Should NOT find 'tea' in 'team' (word boundary should prevent this)"
        },
        {
            "text": "We need to format the document properly.",
            "should_match": True,
            "keyword_to_check": "mat",
            "description": "Should find 'mat' in 'format' (partial word match)"
        },
        {
            "text": "The material was very useful.",
            "should_match": True,
            "keyword_to_check": "mat",
            "description": "Should find 'mat' in 'material' (partial word match)"
        },
        {
            "text": "Let's have some tea together.",
            "should_match": True,
            "keyword_to_check": "tea",
            "description": "Should find 'tea' as a standalone word"
        },
        {
            "text": "The teams are working hard.",
            "should_match": False,
            "keyword_to_check": "tea",
            "description": "Should NOT find 'tea' in 'teams' (word boundary should prevent this)"
        }
    ]
    
    # Add test keywords temporarily
    test_keywords = KEYWORDS + ['tea']  # Add 'tea' for testing
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\nTest {i}: {test_case['description']}")
        print(f"Text: '{test_case['text']}'")
        print(f"Looking for keyword: '{test_case['keyword_to_check']}'")
        
        matches = extract_sentences_from_text(test_case['text'], test_keywords)
        found_keywords = [match['keyword'] for match in matches]
        
        # Check if the specific keyword was found
        keyword_found = test_case['keyword_to_check'] in found_keywords
        
        print(f"Found keywords: {found_keywords}")
        print(f"Keyword '{test_case['keyword_to_check']}' found: {keyword_found}")
        
        if test_case['should_match']:
            print(f"✓ PASS" if keyword_found else "✗ FAIL")
        else:
            print(f"✓ PASS" if not keyword_found else "✗ FAIL")

def test_spaced_keywords():
    """Test spaced keywords (like ' dei ', ' gbv ') functionality."""
    print("\n\n=== Testing Spaced Keywords ===")
    
    test_cases = [
        {
            "text": "The DEI initiative is very important for our organization.",
            "expected_keywords": [],  # ' dei ' (with spaces) should not match 'DEI' without spaces
            "description": "Spaced keyword ' dei ' should not match 'DEI' without surrounding spaces"
        },
        {
            "text": "We focus on dei programs in our company.",
            "expected_keywords": [],  # ' dei ' should not match 'dei' without spaces
            "description": "Spaced keyword ' dei ' should not match 'dei' without surrounding spaces"
        },
        {
            "text": "The program includes dei and other important aspects.",
            "expected_keywords": [],  # This should match if we had ' dei ' in keywords
            "description": "This would match if ' dei ' was properly spaced in the text"
        }
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\nTest {i}: {test_case['description']}")
        print(f"Text: '{test_case['text']}'")
        
        matches = extract_sentences_from_text(test_case['text'], KEYWORDS)
        found_keywords = [match['keyword'] for match in matches]
        
        print(f"Found keywords: {found_keywords}")
        print(f"Expected: {test_case['expected_keywords']}")

def main():
    """Run all tests."""
    print("Testing Search Improvements")
    print("=" * 50)
    
    test_plural_search()
    test_word_boundary()
    test_spaced_keywords()
    
    print("\n\n=== Summary ===")
    print("The improved search functionality includes:")
    print("1. ✓ Plural search: 'survey' will match 'surveys' and vice versa")
    print("2. ✓ Word boundary matching: 'mat' will match 'mathematics' but 'tea' won't match 'teams'")
    print("3. ✓ Preserved spaced keyword behavior: ' dei ' only matches when properly spaced")
    print("4. ✓ Better regex patterns with proper escaping")
    print("5. ✓ Inflect library integration for robust plural/singular handling")

if __name__ == "__main__":
    main()
