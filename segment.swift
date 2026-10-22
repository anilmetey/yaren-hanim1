import Foundation
import CoreImage
import Vision
import AppKit

func removeBackground(inputPath: String, outputPath: String) {
    guard let inputImage = CIImage(contentsOf: URL(fileURLWithPath: inputPath)) else {
        print("Failed to load image at \(inputPath)")
        return
    }
    
    let request = VNGeneratePersonSegmentationRequest()
    request.qualityLevel = .accurate
    request.outputPixelFormat = kCVPixelFormatType_OneComponent8
    
    let handler = VNImageRequestHandler(ciImage: inputImage, options: [:])
    do {
        try handler.perform([request])
        guard let mask = request.results?.first as? VNPixelBufferObservation else {
            print("No mask generated")
            return
        }
        
        let maskImage = CIImage(cvPixelBuffer: mask.pixelBuffer)
        
        // Scale mask to original image size
        let scaleX = inputImage.extent.width / maskImage.extent.width
        let scaleY = inputImage.extent.height / maskImage.extent.height
        let scaledMask = maskImage.transformed(by: CGAffineTransform(scaleX: scaleX, y: scaleY))
        
        // Blend image with mask over transparent background
        guard let filter = CIFilter(name: "CIBlendWithMask") else { return }
        filter.setValue(inputImage, forKey: kCIInputImageKey)
        filter.setValue(CIImage.empty(), forKey: kCIInputBackgroundImageKey)
        filter.setValue(scaledMask, forKey: kCIInputMaskImageKey)
        
        guard let outputCI = filter.outputImage else { return }
        let context = CIContext(options: nil)
        guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else { return }
        
        try context.writePNGRepresentation(of: outputCI,
                                          to: URL(fileURLWithPath: outputPath),
                                          format: .RGBA8,
                                          colorSpace: colorSpace)
        print("Successfully generated: \(outputPath)")
    } catch {
        print("Error: \(error)")
    }
}

removeBackground(inputPath: "assets/images/yaren-kiraz-portrait.jpg", outputPath: "assets/images/yaren-kiraz-portrait-transparent.png")
removeBackground(inputPath: "assets/images/yaren-kiraz-cocuk-oyun-terapisi.jpg", outputPath: "assets/images/yaren-kiraz-cocuk-transparent.png")
